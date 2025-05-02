export interface UserInterface{
  id: number,
    username: string,
    password: string,
    roleType: "CLIENT"|"PROFESSIONAL"|"ADMIN",
    first_name: string,
    last_name: string,
    address: string,
    number: string,
    email: string,
    mySelf_description?: string
}

export type LoginInterface = Pick<UserInterface, "username"|"password">
