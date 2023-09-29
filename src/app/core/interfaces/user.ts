export interface User {
    name:string;
    birthDay:string;
    phone:string;
    credentials: {
        uid:string
        email:string;
        password:string;
    }
}