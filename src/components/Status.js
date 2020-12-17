import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
import axios from "axios";
const API_URL =
  process.env.REACT_APP_API || "http://" + window.location.hostname + ":5000";
function Status() {
  const [count, setCount] = useState();
  const [list, setList] = useState({});
  const [newTweets, setNewTweets] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(API_URL + "/status")
      .then((data) => {
        setCount(data.data);
        setIsLoaded(true);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(API_URL + "/recents")
      .then((data) => {
        setList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(API_URL + "/last")
      .then((data) => {
        setNewTweets(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const io = socket(API_URL);
    io.on("update", (data) => {
      setCount(data);
      axios
        .get(API_URL + "/recents")
        .then((data) => {
          setList(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  useEffect(() => {
    const io = socket(API_URL);
    io.on("tweet", (data) => {
      console.log(data);
      axios
        .get(API_URL + "/last")
        .then((data) => {
          setNewTweets(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(API_URL + "/status")
        .then((data) => {
          setCount(data.data);
          setIsLoaded(true);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  return (
    <div>
      {isLoaded ? (
        <>
          <ul style={{ listStyle: "none"}}>
            <li>
              Yes labels on dataset: {count["yes"]} ={" "}
              {parseFloat((count["yes"] / count["total"]) * 100).toFixed(2)}%
            </li>
            <li>
              No labels on dataset: {count["no"]} ={" "}
              {parseFloat((count["no"] / count["total"]) * 100).toFixed(2)}%
            </li>
            <li>
              Remaining dataset: {count["remaining"]} ={" "}
              {parseFloat((count["remaining"] / count["total"]) * 100).toFixed(
                2
              )}
              %
            </li>

            <li>Total dataset: {count["total"]}</li>
          </ul>
          <div className="row h-75">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row">
                <h3>Latest Answer</h3>
                <ul className="" style={{ listStyle: "none",padding:0 }}>
                  {list.map((data, i) => {
                    return (
                      <li key={i}>
                        <div className="row py-3">
                          <div className="row">
                            <h5 className="col-10">{data.text}</h5>
                            <h5 className="col-2">{data.label}</h5>
                            <i className="col-12">Respondent: {data.respondent.firstName+" "+data.respondent.lastName}</i>
                            <i className="col-12">Email: {data.respondent.email}</i>
                            
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row">
                <h3>Latest Tweets</h3>

                <ul
                  
                  style={{ listStyle: "none" ,padding:0}}
                >
                  {newTweets.map((data, i) => {
                    return (
                      <li key={i}>
                        <div className="row py-3">
                          <h5 className="col">{data.text}</h5>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
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

export default Status;
