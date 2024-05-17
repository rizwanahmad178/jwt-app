import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  axios.defaults.withCredentials = true;
  
  useEffect(()=>{
    axios.get('http://localhost:8282')
          .then(res => {
            if(res.data.Status === "Success"){
              setAuth(true);
              setName(res.data.name);
              navigate('/login');
            }
            else{
              setAuth(false);
              setMessage(res.data.Error);
            }
              
          })
          .catch((err) => console.log(err));
  },[]);

  const handleLogOut=()=>{
    axios.get('http://localhost:8282/logout')
    .then(res=>{
      location.reload(true);
    }).catch(err => console.log(err));
  }

  return (
    <div className='container mt-4'>
      {
        auth ? 
        <div>
          <h3>You are Authorized------{name}</h3>
        <button className='btn btn-danger' onClick={handleLogOut}>Logout</button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>LogIn Now</h3>
          <Link to="/login" className='btn btn-primary'>LogIn</Link>
        </div>
      }
    </div>
  )
}

export default Home
