import React,{useEffect} from 'react'

function ThankYou(props) {
    useEffect(() => {
        props.setHeader("Thank you for participating to our Survey!")
        props.setSub("");   
        // localStorage.setItem("s_u","false");

    });
      return (
        <div class="row pt-4 page">
          <p class="col-12 col-sm-12 col-md-9 p-0 lead">
            For questions and concerns, please message us at&nbsp;
            <a href = "mailto: talk@jairusmingua.xyz">talk@jairusmingua.xyz</a>
          </p>
          <div class="col-12 col-sm-12 col-md-3"></div>
         
        </div>
    );
}

export default ThankYou
