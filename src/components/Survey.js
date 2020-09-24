import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink, useHistory } from "react-router-dom";
import {ProgressBar} from 'react-bootstrap';
import axios from "axios";
function Survey(props) {
  let history = useHistory();
  const [isLoaded, setLoaded] = useState(false);
  let numberOfQuestions = 5;
  const [questionIndex, setQuestionIndex] = useState(1);
  let toggles = ["Yes","No","none"];
  const [toggle,setToggle]=useState(toggles["none"]);


  useEffect(() => {
    refreshTweet();
  }, []);
  useEffect(() => {
    props.setHeader("Is the tweet fire related or not?");
    props.setSub("Lock-in your answer");
    setToggle("none");
  }, [props.tweet]);
  
  
  
  function nextQuestion(buttonpressed) {
        if(toggle=="none"){
            setToggle(buttonpressed);
        }
        else if(toggle!=toggles["none"] && buttonpressed==toggle){
            setQuestionIndex(questionIndex + 1);
            if(questionIndex==numberOfQuestions){
                history.push("/ThankYou");
            }
            else{
                refreshTweet();
            }
        }else{
            setToggle(buttonpressed);
        }
    
  }
  function refreshTweet() {
    setLoaded(false);
    var tweet_ = null;
    axios
      .get(process.env.REACT_APP_API || "http://"+window.location.hostname+":5000/", {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data[0].text);
        tweet_ = data.data[0].text;
        props.setTweet(tweet_);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      {isLoaded ? (
        <div className="row pt-4 pb-5 mb-5">
          <div className="col-12 box">
            <h5>{props.tweet}</h5>
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <button
                type="button"
                className={`col-6 btn yesbtn btn-lg ${(toggle=="No") &&  'disabled'}`}
                onClick={()=>{nextQuestion("Yes")}}
              >
                Yes
              </button>
              <button
                type="button"
                className={`col-6 btn nobtn btn-lg ${(toggle=="Yes" ) && 'disabled'}`}
                onClick={()=>{nextQuestion("No")}}
              >
                No
              </button>
            </div>
          </div>
          <ProgressBar className="col-12 p-0 mt-3" now={questionIndex*(100/numberOfQuestions)}></ProgressBar>
          <div className="col-12">
            <p className="text-center mt-2">
              Question {questionIndex} out of {numberOfQuestions}
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
