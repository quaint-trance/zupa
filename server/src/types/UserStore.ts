import { UserData } from "../entities/User";

export interface UserStore{
    findByName: (name: string) => Promise<UserData | null>,
    findByEmail: (name: string) => Promise<UserData | null>,
    save: (data: UserData) => Promise<boolean>,
    create: (data: UserData) => Promise<boolean>,
}