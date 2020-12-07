import React,{useEffect,useState} from 'react'
import socket from 'socket.io-client';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API || "http://" + window.location.hostname + ":5000";
function Status() {
    const [count,setCount] = useState();
    const [isLoaded,setIsLoaded] = useState(false);
    useEffect(()=>{
        axios.get(API_URL+"/status")
        .then((data)=>{
            setCount(data.data);
            setIsLoaded(true);
            // console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
        const io = socket(API_URL);
        io.on("update",data=>{
            setCount(data);
        })
    },[])
    return (
        <div>
         
       {isLoaded ? 
         <ul>  
           <li>
             Yes labels on dataset: {count['yes']} = {parseFloat((count['yes']/count['total'])*100).toFixed(2)}%
           </li>
           <li>
             No labels on dataset: {count['no']} = {parseFloat((count['no']/count['total'])*100).toFixed(2)}%
           </li>
           <li>
             Remaining dataset: {count['remaining']} = {parseFloat((count['remaining']/count['total'])*100).toFixed(2)}%
           </li>
         
           <li>
             Total dataset: {count['total']}
           </li>
         
         </ul>
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
