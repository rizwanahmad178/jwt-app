import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8282/signup', values)
      .then(res => {
        if(res.data.Status === "Success")
          navigate('/login');
        else
          alert("Error");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="text-center">Sign Up Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className="form-control rounded-0"
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={e => setValues({ ...values, password: e.target.value })}
            />
          </div>
          
          <button type="submit" className="btn btn-success w-100">
            <strong>SignUp</strong>
          </button>
          <p>Already have an account? Click here to login.</p>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light text-decoration-none"
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
