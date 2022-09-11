import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Screen from '../Screen'
import Login from '../../pages/Login'
import NotFound from '../../pages/NotFound'

const req = require.context(
    '../../pages',
    true,
    /route\.ts?$/
  );

export default function Router() {

    const getRoute = () => {
        return req
        .keys()
        .map(k => req(k).default)
        .reduce((result, m) => {
          if (Array.isArray(m)) {
            return result.concat(m);
          } else {
            return result.concat([m]);
          }
        }, [])
    }

    const renderRouter: any = () => {
        const routeList = getRoute()
        return routeList.map((item:any)=>{
            let Component = item.component
            return <Route path={item.path} key={item.path} element={<Component/>}></Route>
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
