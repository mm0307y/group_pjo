import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../page/trip/HomePage'
import ErrorPage from '../page/ErrorPage'

const AppRouter = () => {
    const role = localStorage.getItem("role") //USER, ADMIN  -> enum열거형 타입
  return (
    <Routes>
            <Route path="/" exact={true} element={<HomePage />}/>
            <Route path='/error' exact={true} element={<ErrorPage />}></Route>
        </Routes>        
    )
}

export default AppRouter