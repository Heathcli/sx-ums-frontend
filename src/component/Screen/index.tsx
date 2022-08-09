import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import './index.less'
import { Link, Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setUserInfo } from "../../redux/slice/userSlice";
import http from "../../libs/http";
import { useNavigate } from "react-router-dom";
import { RouterTree, RouterTreeMock } from '../Router/type';


type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Footer, Sider } = Layout;
const rootSubmenuKeys = ['home'];

const Screen: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [openKeys, setOpenKeys] = useState(['home']);

  useEffect(()=>{
    dispatch(setUserInfo({
        studentId:1234,
        name:'string',
        role:'string',
        roleId:43434,
        position:'string',
        positionId:1
      }))
  },[])

  const getUserInfo = () => {
      return {
        studentId:1234,
        name:'string',
        role:'string',
        roleId:43434,
        position:'string',
        positionId:1
      }
     http.post('').then((res)=>{
      return res
    }).catch(()=>{
    //   navigate('/login')
    })
  }
    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    const linkRoute = (title: string, route: string): React.ReactNode => {
        return <Link to={route}>{title}</Link>
    }
    // const items: MenuItem[] = [
    //     getItem(linkRoute('首页', 'home'), 'home', <UserOutlined />),
    //     getItem('用户管理', 'user', <UserOutlined />, [
    //         getItem(linkRoute('用户列表', 'user-list'), 'user-list'),
    //     ])
    // ];

    const dynamicItems:any = (RouterTreeMock: RouterTree[] = [],arr:MenuItem[] = []) => {
        RouterTreeMock.map((item)=>{
            if(!item.children) {
                if(item.view) {
                    const linkItem =  getItem(linkRoute(item.name, item.route), item.route, <UserOutlined />)
                    arr.push(linkItem)
                }
            }else{
                if(item.view) {
                    const linkItem =  getItem(item.name,item.route, <UserOutlined />,dynamicItems(item.children,[]))
                    arr.push(linkItem)
                }
            }
        })
        return arr
    }
    
    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo"></div>
                <Menu
                    mode="inline"
                    theme='dark'
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={dynamicItems(RouterTreeMock,[])}
                />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '10px 10px 0' }}>
                    <div className="site-layout-background">
                        <Outlet />
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    )
};

export default Screen;