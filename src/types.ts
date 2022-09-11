// 筛选项列表
export interface FilterList {
    code:number,
    name:string|number
}
// 当前登录用户的信息
export interface UserInfo {
    studentId:number,
    name:string,
    role:string,
    roleId:number,
    position:string,
    positionId:number,
    routeTree:RouterTree[]
}

// 路由
export interface RouterTree {
    [index: string]: boolean|string|RouterTree[]|undefined,
    name: string,
    route: string,
    view?:boolean,
    children?: RouterTree[]
}