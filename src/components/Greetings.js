import React, { useEffect } from "react";

import { BrowserRouter as Router, NavLink } from "react-router-dom";
function Greetings(props) {
  useEffect(() => {
    props.setHeader("Greetings!")
    props.setSub("");   
    localStorage.removeItem("s_u");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    
  });
  return (
    <div className="row pt-4 page">
      <p className="col-12 col-sm-12 col-md-9 p-0 lead">
        We are students from Mapua University and we are conducting a survey
        regarding our thesis. Our thesis aims to&nbsp;
        <b>
          <u>solve</u>
        </b>
        &nbsp;problems such as&nbsp;
        <b>
          <u>detecting whether a tweet is a fire report or not.</u>
        </b>
        &nbsp;Your response are valuable in order to achieve this task.
      </p>
      <div className="col-12 col-sm-12 col-md-3"></div>
      <div className="row mt-4 ml-0">
       
          
            <NavLink className="text-white" to="/FillUp">
            <button type="button" className="btn primarybtn btn-lg">Take Survey</button>
            </NavLink>
          
       
      </div>
    </div>
  );
}

export default Greetings;
