import Screen from '../Screen'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import UserList from '../../pages/User/UserList'

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='home' />}></Route>
            <Route path='/' element={<Screen />}>
                <Route path='home' element={<Home />}></Route>
                <Route path='user-list' element={<UserList />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
    )
}