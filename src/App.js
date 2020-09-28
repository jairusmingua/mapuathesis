import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Greetings from "./components/Greetings";
import { useState, useEffect } from "react";
import Fillup from "./components/Fillup";
import Survey from "./components/Survey";
import ThankYou from "./components/ThankYou";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Status from "./components/Status";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import {} from "dotenv/config";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  const [headertxt, setHeader] = useState("");
  const [subtxt, setSub] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [tweet, setTweet] = useState("");
  function formSubmit(data) {
    let keys = Object.keys(data);
    keys.map((item)=>{
      if(item=="firstName"||item=="lastName"){
        data[item] =toTitleCase(data[item]);
      }
    })
    setUserInfo(data);
  }
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5 mx-2">
          <div className="col">
     
            <div className="row">
              <div className="col-8 p-0 mt-lg-5 mt-2">
                <h1 className="float-center">{headertxt}</h1>
                <p className="float-center lead">{subtxt}</p>
              </div>
              <div className="col-4 ">
                <img
                  className="logo float-right"
                  src="https://upload.wikimedia.org/wikipedia/en/6/65/Map%C3%BAa_University_logo.png"
                />
              </div>
            </div>
    
            <Router>
              <Route
                render={({location}) => (
                  <TransitionGroup>
                    <CSSTransition timeout={500} classNames="fade" key={location.key}>
                      <Switch location={location}>
                        <Route exact path="/">
                          <Greetings setHeader={setHeader} setSub={setSub} />
                        </Route>
                        <Route path="/FillUp">
                          <Fillup
                            setHeader={setHeader}
                            setSub={setSub}
                            formSubmit={formSubmit}
                            userInfo={userInfo}
                          />
                        </Route>
                        <PublicRoute
                          
                          setHeader={setHeader}
                          setSub={setSub}
                          setUserInfo={setUserInfo}
                          userInfo={userInfo}
                          headertxt={headertxt}
                          subtxt={subtxt}
                          tweet={tweet}
                          setTweet={setTweet}
                          restricted={true}
                          component={Survey}
                          path="/Survey"
                          exact
                        />
                        <PrivateRoute
                          setSub={setSub}
                          headertxt={headertxt}
                          subtxt={subtxt}
                          setHeader={setHeader}
                          component={ThankYou}
                          path="/ThankYou"
                          exact
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            </Router>
            <Router>
                  <Switch>
                    <Route exact path="/Status">
                            <Status setHeader={setHeader} setSub={setSub} />
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
