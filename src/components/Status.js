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
      console.log(data)
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
          <ul>
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
          <div className="row">
            <ul className="col-6" style={{ listStyle: "none" }}>
              {list.map((data, i) => {
                return (
                  <li key={i}>
                    <div className="row py-3">
                      <div className="col-6">{data.text}</div>
                      <div className="col-6">{data.label}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul className="col-6" style={{ listStyle: "none" }}>
              {newTweets.map((data, i) => {
                return (
                  <li key={i}>
                    <div className="row py-3">
                      <div className="col-6">{data.text}</div>
                      <div className="col-6">{data.label}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
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
