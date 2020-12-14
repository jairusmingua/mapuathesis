import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";
function Survey({ ...props }) {
  let api_url =
    process.env.REACT_APP_API || "http://" + window.location.hostname + ":5000";
  let history = useHistory();
  const [isLoaded, setLoaded] = useState(false);
  let numberOfQuestions = process.env.NODE_ENV == "production" ? 25 : 3;
  try {
    if(JSON.parse(localStorage.getItem("role"))["role"]=="admin"){
      numberOfQuestions = -1;
    }
    
  } catch (error) {
    
  }
  const [questionIndex, setQuestionIndex] = useState(1);
  let toggles = ["Yes", "No", "none"];
  const [toggle, setToggle] = useState(toggles["none"]);
  const [id, setId] = useState("");
  useEffect(() => {
    props.setHeader("Is the tweet fire related or not?");
    props.setSub("Lock-in your answer");
    refreshTweet();
  }, []);
  useEffect(() => {
    props.setHeader("Is the tweet fire related or not?");
    props.setSub("Lock-in your answer");
    setToggle("none");
  }, [props.tweet]);
  async function respondLabel(answer) {
    if (localStorage.getItem("user")) {
      let response = {
        _id: id,
        answer: answer,
        respondent: JSON.parse(localStorage.getItem("user"))
      }
      console.log(response);
      axios
        .post(api_url, response, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async function doneResponse() {
    console.log(props);
    console.log("done" + props.userInfo);

    axios
      .post(api_url + "/done", props.userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  async function nextQuestion(buttonpressed) {
    if (toggle == "none") {
      setToggle(buttonpressed);
    } else if (toggle != toggles["none"] && buttonpressed == toggle) {
      setQuestionIndex(questionIndex + 1);
      if (questionIndex == numberOfQuestions) {
        if (buttonpressed == "Yes") {
          respondLabel(1);
        } else if (buttonpressed == "No") {
          respondLabel(0);
        }
        await doneResponse();
        localStorage.setItem("s_u", "false");
        window.location = "/ThankYou";
      } else {
        if (buttonpressed == "Yes") {
          respondLabel(1);
        } else if (buttonpressed == "No") {
          respondLabel(0);
        }
        refreshTweet();
      }
    } else {
      setToggle(buttonpressed);
    }
  }
  async function refreshTweet() {
    setLoaded(false);
    var tweet_ = null;
    await axios
      .get(api_url, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data[0].text);
        tweet_ = data.data[0].text;
        props.setTweet(tweet_);
        setId(data.data[0]._id);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
        localStorage.setItem("s_u", "false");
        window.location = "/ThankYou";
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
                className={`col-6 btn yesbtn btn-lg ${
                  toggle == "No" && "disabled"
                }`}
                onClick={() => {
                  nextQuestion("Yes");
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className={`col-6 btn nobtn btn-lg ${
                  toggle == "Yes" && "disabled"
                }`}
                onClick={() => {
                  nextQuestion("No");
                }}
              >
                No
              </button>
            </div>
          </div>
          <ProgressBar
            className="col-12 p-0 mt-3"
            now={questionIndex * (100 / numberOfQuestions)}
          ></ProgressBar>
          <div className="col-12">
            <p className="text-center mt-2">
              Question {questionIndex} out of {numberOfQuestions==-1?"katapusan ng mundo":numberOfQuestions}
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
