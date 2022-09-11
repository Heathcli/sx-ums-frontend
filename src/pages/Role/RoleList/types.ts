export interface ISubFilter {
    [index: string]: number|string|undefined,
    grade?:number|string,
    college?:number|string,
    role?:number|string,
    position?:number|string
}
export interface Role {
    // id 角色名 
    id:number,
    name:string
}

export interface ExpandedDataType {
    id: React.Key;
    name: string;
  }