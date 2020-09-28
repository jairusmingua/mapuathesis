import React,{useEffect,useState} from 'react'
import socket from 'socket.io-client';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API || "http://" + window.location.hostname + ":5000/";
function Status() {
    const [count,setCount] = useState();
    const [isLoaded,setIsLoaded] = useState(false);
    useEffect(()=>{
        axios.get(API_URL+"/remaining")
        .then((data)=>{
            setCount(data.data.responded);
            setIsLoaded(true);
            // console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
        const io = socket(API_URL);
        io.on("update",data=>{
            setCount(data.responded);
        })
    },[])
    return (
        <div>
         
       {isLoaded ? 
         <div>  Remaining dataset: {count}</div>
        : 
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
        </div>
    )
}

export default Status
