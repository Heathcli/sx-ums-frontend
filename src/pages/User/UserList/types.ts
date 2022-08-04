export interface ISubFilter {
    [index: string]: number|string|undefined,
    grade?:number|string,
    college?:number|string,
    role?:number|string,
    position?:number|string
}
export interface IUser {
    // 学号、姓名、年级、学院、专业班级、角色、职能、操作
    studentId:number,
    name:string,
    grade:number,
    college:string,
    professionalClass:string,
    role:string,
    position:string
}