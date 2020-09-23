import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Greetings from './components/Greetings';
import {useState,useEffect}from "react";
import Fillup from "./components/Fillup";
import Survey from "./components/Survey";
import { BrowserRouter as Router, NavLink, Switch , Route} from "react-router-dom";
function App() {
  const [headertxt,setHeader] =useState("");
  const [subtxt,setSub] =useState("");
  const [userInfo,setUserInfo] =useState({});
  const [tweet,setTweet]=useState("");
  function formSubmit(data){
    setUserInfo(data);
  }
  return (
    <div className="App">
      <div class="container">
        <div class="row mt-5 mx-2">
          <div class="col">
            {/* header */}
            <div class="row">
              <div class="col-8 p-0 mt-lg-5 mt-2">
                <h1 class="float-center">{headertxt}</h1>
                <p class="float-center lead">{subtxt}</p>
              </div>
              <div class="col-4 ">
                <img
                  class="logo float-right"
                  src="https://upload.wikimedia.org/wikipedia/en/6/65/Map%C3%BAa_University_logo.png"
                />
              </div>
            </div>
            {/* maincontent */}
            <Router>
              <Switch>
                {/* <Route exact path="/" component={Greetings}/>
                <Route path="/FillUp" component={Fillup}/>
           */}
                <Route exact path="/">
                  <Greetings setHeader={setHeader} setSub={setSub}/>
                </Route>
                <Route path="/FillUp">
                  <Fillup setHeader={setHeader} setSub={setSub} formSubmit={formSubmit}/>
                </Route>
                <Route path="/Survey">
                  <Survey setHeader={setHeader} setSub={setSub} setUserInfo={setUserInfo} headertxt={headertxt} subtxt={subtxt} tweet={tweet} setTweet={setTweet}/>
                </Route>
                
              </Switch>
            </Router>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
