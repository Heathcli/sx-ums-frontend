import React, { ReactNode, useEffect, useState } from 'react';
import { ApartmentOutlined, createFromIconfontCN, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import moment from 'moment'
import './index.less'
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/slice/userSlice";
import { RouterTree } from '../../types';


type MenuItem = Required<MenuProps>['items'][number];
type RoutesMapIcon = {
    [index: string]: ReactNode,
}
const { Header, Content, Footer, Sider } = Layout;
// 所有可展开节点key值
const rootSubmenuKeys = ['user-manage', 'role-manage']
const pathname = window.location.pathname
const defaultSelectedKeys = pathname !== '/' ? [pathname] : ['/home']
// 图标映射，这里是可以后端返svg，但还是字体图标简单，先前端处理，以后可以优化
const routesMapIcon: RoutesMapIcon = {
    '/home': <HomeOutlined />,
    'user-manage': <UserOutlined />,
    'role-manage': <ApartmentOutlined />
}
/* 
与后端约定: 可展开节点的route为当前级路径名称，只有叶子结点为完整路径
因为只有叶子结点才会有路由页面，前端方便做默认展开菜单，对后端也没啥影响
叶子结点需设置openKeys，所有可展开节点需设置defaultSelectedKeys 

例如：
[
    ...
    {
        name: '用户管理',
        route: 'user-manage',
        children: [
          {
            name: '用户编辑',
            route: 'edit',
            children: [
              {
                name: '用户列表',
                route: '/user-manage/edit/list',
              }
            ]
          }
        ]
    }
    ...
]
*/

const Screen: React.FC = () => {

    const { userInfo } = useAppSelector(selectUser)

    const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"))
    const [openKeys, setOpenKeys] = useState(pathname.slice(1, pathname.length).split('/'));

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format("YYYY-MM-DD HH:mm:ss"))
        }, 1000);
    }, [time])

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

    const dynamicItems: any = (RouterTree: RouterTree[] = [], arr: MenuItem[] = []) => {
        RouterTree.map((item) => {
            if (!item.children) {
                const linkItem = getItem(linkRoute(item.name, item.route), item.route, routesMapIcon[item.route])
                arr.push(linkItem)
            } else {
                const linkItem = getItem(item.name, item.route, routesMapIcon[item.route], dynamicItems(item.children, []))
                arr.push(linkItem)
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
                <Footer style={{ textAlign: 'center' }}>赛行工作室管理系统 ©2022 Created by 赛行工作室软件组</Footer>
            </Layout>
        </Layout>
    )
};

export default Screen;