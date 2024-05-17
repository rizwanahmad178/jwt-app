import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
      });
    
      const navigate = useNavigate();
      axios.defaults.withCredentials = true;
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post('http://localhost:8282/login', values)
          .then(res => {
            if(res.data.Status === "Success")
              navigate('/');
            else
              alert(res.data.Error);
          })
          .catch((err) => console.log(err));
      };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Log In </h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor=""><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name="email" className='form-control rounded-0' onChange={e => setValues({ ...values, email: e.target.value })}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor=""><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name="password" className='form-control rounded-0' onChange={e => setValues({ ...values, password: e.target.value })}/>
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Login</strong></button>
                    <p>You are agree to our terms & policy!</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
