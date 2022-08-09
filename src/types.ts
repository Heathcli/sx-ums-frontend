// 筛选项列表
export interface IFilterList {
    code:number,
    name:string|number
}
// 当前登录用户的信息
export interface IUserInfo {
    studentId:number,
    name:string,
    role:string,
    roleId:number,
    position:string,
    positionId:number,
    routeTree:IRouterTree[]
}

// 路由
export interface IRouterTree {
    name: string,
    route: string,
    view?:boolean,
    children?: IRouterTree[]
}