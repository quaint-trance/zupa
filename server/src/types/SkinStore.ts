import { SkinData } from "../valueObjects/Skin";

export interface SkinStore{
    findById: (name: string) => Promise<SkinData| null>,
    save: (data: SkinData) => Promise<boolean>,
    create: (data: SkinData) => Promise<boolean>,
}