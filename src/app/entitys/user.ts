

export interface User{
userId?:number;
name?:string;
account?:string;
password?:string;
    sex?: string,
    roles?: string,
    forbidden?: false,
    telephone?: number,
    grade?: string,
    creditScore?: number,
    registerDate?: Date,
    loginDate?: Date,
    comment?: string
}

export const userOne:User={
    
    name:"asd",
    account:"asd@qq.com",
    password:"asdasd"

}