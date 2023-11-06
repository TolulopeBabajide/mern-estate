import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './SignUp'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<About/>} path="/about" />
      <Route element={<Profile/>} path="/profile" />
      <Route element={<SignIn/>} path="/signIn" />
      <Route element={<SignUp/>} path="/signUp" />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App