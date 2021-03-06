export interface matchHistory{
    t: string, 
    winner: string,
    date: string;
}

export interface UserData{
    email: string;
    name: string;
    password: string;
    description: string;
    history: matchHistory[];
    music: string;
    gameSettings:{
        connect4?:{
            skin?:string,
            unlocked:string[]
        }
    }
}
