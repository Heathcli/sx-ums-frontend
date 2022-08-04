export interface ISubFilter {
    [index: string]: number|string|undefined,
    grade?:number|string,
    college?:number|string,
    role?:number|string,
    position?:number|string
}
export interface UserListType {
    key:string,
    name:string,
    age:number,
    address:string
  }