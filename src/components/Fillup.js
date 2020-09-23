import React,{useEffect} from "react";
import { BrowserRouter as Router, NavLink,useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";
function Fillup(props) {

    let history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {console.log(data);props.formSubmit(data);history.push("/Survey")};
    useEffect(() => {
        props.setHeader("Fill Up the Following Details");  
        props.setSub("");   

      });
  return (
    <div className="row pt-4 pb-5 mb-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName && "is-invalid"}`}
              placeholder="Juan"
              name="firstName"
              ref={register({required:true})}
            />
            {errors.firstName && <small className="invalid-feedback">This field is required</small>}
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName && "is-invalid"}`}
              placeholder="Dela Cruz"
              name="lastName"
              ref={register({required:true})}
            />
            {errors.lastName && <small  className="invalid-feedback">This field is required</small>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              placeholder="example@example.com"
              name="email"
              ref={register({required:true})}
            />
            {errors.email && <small  className="invalid-feedback">This field is required</small>}
          </div>
          <div className="form-group col-md-4">
            <label>Occupation</label>
            <select className={`form-control ${errors.occupation && "is-invalid"}`} name="occupation" ref={register({required:true})}>
              <option selected>Student</option>
              <option>Others</option>
            </select>
            {errors.occupation && <small  className="invalid-feedback">This field is required</small>}
          </div>
          <div className="form-group col-md-2">
            <label>Age</label>
            <input type="number" className={`form-control ${errors.age && "is-invalid"}`} ref={register({required:true})} name="age"/>
            {errors.age && <small  className="invalid-feedback">This field is required</small>}
          </div>
        </div>
        <input type ="submit" className="btn primarybtn btn-lg px-5 mt-lg-5 mt-4 " value="Next"/>
    
        {/* <NavLink to="/Survey">
            <button className="btn primarybtn btn-lg px-5 mt-lg-5 mt-4 ">
                Next
            </button>
        </NavLink> */}
      </form>
    </div>
  );
}

export default Fillup;
