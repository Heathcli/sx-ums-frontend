import React, { ReactNode, useEffect, useState } from 'react';
import { createFromIconfontCN, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import moment from 'moment'
import './index.less'
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/slice/userSlice";
import { IRouterTree } from '../../types';


type MenuItem = Required<MenuProps>['items'][number];
type RoutesMapIcon = {
    [index: string]: ReactNode,
}
const { Header, Content, Footer, Sider } = Layout;
// 所有可展开节点key值
const rootSubmenuKeys = ['user-manage']
const defaultSelectedKeys = [window.location.pathname]
const routesMapIcon: RoutesMapIcon = {
    '/home': <HomeOutlined />,
    'user-manage': <UserOutlined />
}

// 此处规则:  /route ---->  所有叶子节点
//           route  ---->  可展开节点
// 区分是为了设置默认选项，/route需设置openKeys，route需设置defaultSelectedKeys

const Screen: React.FC = () => {

    const { userInfo } = useAppSelector(selectUser)
    
    const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"))

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format("YYYY-MM-DD HH:mm:ss"))
        }, 1000);
    }, [time])

    const [openKeys, setOpenKeys] = useState(window.location.pathname.split('/'));

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

    const dynamicItems: any = (RouterTree: IRouterTree[] = [], arr: MenuItem[] = []) => {
        RouterTree.map((item) => {
            if (!item.children) {
                if (item.view) {
                    const linkItem = getItem(linkRoute(item.name, item.route), item.route, routesMapIcon[item.route])
                    arr.push(linkItem)
                }
            } else {
                if (item.view) {
                    const linkItem = getItem(item.name, item.route, routesMapIcon[item.route], dynamicItems(item.children, []))
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
                <div className="logo">赛行工作室</div>
                <Menu
                    mode="inline"
                    theme='dark'
                    defaultSelectedKeys={defaultSelectedKeys}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={dynamicItems(userInfo.routeTree, [])}
                />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header className="site-layout-sub-header-background">
                    <span className='normal'>现在是</span><span className='high-light'>{time}</span>
                    <span className='normal'>欢迎</span><span className='high-light'>{'王五'}</span>
                </Header>
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