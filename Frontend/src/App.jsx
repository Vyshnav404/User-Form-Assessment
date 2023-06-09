import React from 'react'
import SignupForm from './components/SignupForm'
import LoginPage from './components/LoginPage'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
   <Routes>
    <Route path='/signup' element={<SignupForm/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
   </Routes>
  )
}

export default App
