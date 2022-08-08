import { ReactNode } from "react"

export interface RouterTree {
    name: string,
    route: string,
    view?:boolean,
    children?: RouterTree[]
}

export const RouterTreeMock: RouterTree[] = [
    {
        name: '首页',
        route: 'home',
        view:true
    },
    {
        name: '用户管理',
        route: '/user-manage',
        view:true,
        children:[
            {
                name: '用户列表',
                route: '/user-manage/list',
                view:true
            },
            {
                name: '新增用户',
                route: '/user-manage/add'
            },
            {
                name: '编辑用户',
                route: '/user-manage/mod/:id'
            }
        ]
    }
]

export interface iroutes {
    [index: string]: ReactNode,
}