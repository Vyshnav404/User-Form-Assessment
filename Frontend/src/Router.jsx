import React from 'react'
import SignupForm from './components/SignupForm'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { Route,Routes } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'

function Router() {
  return (
    <Routes>
    <Route path='/signup' element={<SignupForm/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/' element={<PrivateRoutes> <HomePage/> </PrivateRoutes> }></Route>
   </Routes>
  )
}

export default Router
