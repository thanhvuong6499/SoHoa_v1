
export class User {
       public id: number
       public username: string
       public password: string
       public userole: string
       public roles?: string
}

export const users : User[] = [
    {
        id: 1,
        username: "test",
        password: "test",
        userole: "user",
        roles: "edit"
    },
    {
        id: 2,
        username: "user",
        password: "user",
        userole: "user",
        roles: "create"
    },
    {
        id: 3,
        username: "admin",
        password: "admin",
        userole: "admin"
    }
]