import { SkinData } from "../domain/Skin/SkinTypes";
import Skin from "../domain/Skin"

export interface SkinStore{
    findById: (name: string) => Promise<Skin| null>,
    getAll: () => Promise<Skin[]>,
    save: (data: Skin) => Promise<boolean>,
    create: (data: Skin) => Promise<boolean>,
}