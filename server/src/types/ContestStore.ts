import Contest from '../domain/Contest'

export interface ContestStore{
    findById: (id: string) => Promise<Contest | null>,
    findByGame: (game: string) => Promise<Contest[] | null>,
    findAll: (game: string) => Promise<Contest[] | null>,
    save: (data: Contest) => Promise<boolean>,
}