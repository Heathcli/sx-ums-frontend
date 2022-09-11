export interface SubFilterType {
    [index: string]: number|string|undefined,
    grade?:number|string,
    college?:number|string,
    role?:number|string,
    position?:number|string
}
export interface User {
    // 学号、姓名、年级、学院、专业班级、角色、职能、操作
    studentId:number,
    name:string,
    grade:number,
    gradeId:number,
    college:string,
    collegeId:number,
    professionalClass:string,
    role:string,
    roleId:number,
    position:string,
    positionId:number,
    password?:string
}