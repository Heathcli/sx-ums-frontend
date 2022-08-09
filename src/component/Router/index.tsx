import Screen from '../Screen'
import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import UserList from '../../pages/User/UserList'
import Edit from '../../pages/User/UserList/Edit'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/slice/userSlice'
import NotFound from '../../pages/NotFound'

const routesMapComponent: any = [
    { '/home': <Home /> },
    { '/user-manage/list': <UserList /> },
    { '/user-manage/add': <Edit /> },
    { '/user-manage/mod/:id': <Edit /> }
]

export default function Router() {
    const { userInfo } = useAppSelector(selectUser)

    const renderRouter: any = () => {
        return routesMapComponent.map((item:any)=>{
            return <Route path={Object.keys(item)[0]} key={Object.keys(item)[0]} element={Object.values(item)[0] as ReactNode}></Route>
        })
    }

    return (
        <Routes>
            <Route path='/' element={<Navigate to='home' />}></Route>
            <Route path='/' element={<Screen />}>
                {renderRouter()}
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/error' element={<NotFound />}></Route>
            <Route path='*' element={<Navigate to='/error' />}></Route>
        </Routes>
    )
}
