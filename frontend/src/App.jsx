import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
