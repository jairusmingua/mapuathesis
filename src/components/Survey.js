import React,{useEffect,useState} from 'react'
import { BrowserRouter as Router, NavLink, useHistory } from "react-router-dom";
import axios from 'axios';
function Survey(props) {
    let history = useHistory();
    useEffect(() => {
        refreshTweet();
    },[]);
    useEffect(() => {
        props.setHeader("Is the tweet fire related or not?");   
        props.setSub("Lock-in your answer"); 
    },[props.tweet]);

    function refreshTweet(){
        var tweet_ = null;
        axios.get("https://mapuathesisbackend.herokuapp.com/",{
            headers:{
                "Content-type":"application/json"
            }
            
        }).then((data)=>{
            console.log(data.data[0].text);
            tweet_ = data.data[0].text;
            props.setTweet(tweet_);
            
        }).catch((err)=>{
            console.log(err);
        })   
    }
    return (
        <div class="row pt-4 pb-5 mb-5">
        <div class="col-12 box">
            <h5>{props.tweet}</h5>
        </div>
        <div class="col-12 mt-3">
            <div class="row">
                <button type="button" class="col-6 btn yesbtn btn-lg" onClick={refreshTweet}>Yes</button>
                <button type="button" class="col-6 btn nobtn btn-lg" onClick={refreshTweet}>No</button>
            </div>
        
        </div>

    </div>
    )
}

export default Survey
