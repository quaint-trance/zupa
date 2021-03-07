import User from "../domain/User"
import { UserData } from "../domain/User/UserTypes"

export interface UserStore{
    findByName: (name: string) => Promise<User | null>,
    findByEmail: (name: string) => Promise<User | null>,
    save: (data: User) => Promise<boolean>,
}