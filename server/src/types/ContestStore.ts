import Contest from '../domain/Contest'

export interface ContestStore{
    findById: (name: string) => Promise<Contest | null>,
    save: (data: Contest) => Promise<boolean>,
}