import Screen from '../Screen'
import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import UserList from '../../pages/User/UserList'
import Edit from '../../pages/User/UserList/Edit'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/slice/userSlice'
import NotFound from '../../pages/Home/NotFound'
import { iroutes, RouterTree, RouterTreeMock } from './type'

const routes:iroutes = {
    '/home':<Home />,
    '/user-manage/list':<UserList />,
    '/user-manage/add':<Edit />,
    '/user-manage/mod/:id':<Edit />
}

export default function Router() {
    const { userInfo } = useAppSelector(selectUser)

    const renderRouter:any = (RouterTree:RouterTree[]) => {
        return RouterTree.map(item =>{
            if(item.children?.length) {
                return renderRouter(item.children)
            } else {
                return <Route key={item.route} path={item.route} element={routes[item.route]}></Route>
            }
        })
    }
    
    return (
        <Routes>
            <Route path='/' element={<Navigate to='home' />}></Route>
            <Route path='/' element={<Screen />}>
                {renderRouter(RouterTreeMock)}
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/error' element={<NotFound />}></Route>
            <Route path='*' element={<Navigate to='/error' />}></Route>
        </Routes>
    )
}
