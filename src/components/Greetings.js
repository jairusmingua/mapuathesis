import React, { useEffect } from "react";

import { BrowserRouter as Router, NavLink } from "react-router-dom";
function Greetings(props) {
  useEffect(() => {
    props.setHeader("Greetings!")
    props.setSub("");   
    
  });
  return (
    <div class="row pt-4">
      <p class="col-12 col-sm-12 col-md-9 p-0 lead">
        We are students from Mapua University and we are conducting a survey
        regarding our thesis. Our thesis aims to
        <b>
          <u>solve</u>
        </b>
        problems such as
        <b>
          <u>detecting whether a tweet is a fire report or not.</u>
        </b>
        Your response are valuable in order to achieve this task.
      </p>
      <div class="col-12 col-sm-12 col-md-3"></div>
      <div class="row mt-4 ml-0">
       
          
            <NavLink className="text-white" to="/FillUp">
            <button type="button" class="btn primarybtn btn-lg">Take Survey</button>
            </NavLink>
          
       
      </div>
    </div>
  );
}

export default Greetings;
