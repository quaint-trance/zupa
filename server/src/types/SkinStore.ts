import { SkinData } from "../domain/entities/Skin";

export interface SkinStore{
    findById: (name: string) => Promise<SkinData| null>,
    getAll: () => Promise<SkinData[]>,
    save: (data: SkinData) => Promise<boolean>,
    create: (data: SkinData) => Promise<boolean>,
}