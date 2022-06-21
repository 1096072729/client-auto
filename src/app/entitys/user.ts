

export interface User{
userId?:number;
name?:string;
avatarUrl?:string;
account?:string;
password?:string;
    sex?: string,
    roles?: string,
    forbidden?: boolean,
    telephone?: number,
    grade?: string,
    creditScore?: number,
    registerDate?: Date,
    loginDate?: Date,
    comment?: string
}

export const userOne:User={
    userId:-1,
    name:"未登录",
    account:"未登录",
    password:"asdasd",
    sex: '',
    roles: '',
    forbidden: false,
    telephone: -1,
    grade: '',
    creditScore: -1,
    registerDate: new Date(),
    loginDate: new Date(),
    comment: ''
}