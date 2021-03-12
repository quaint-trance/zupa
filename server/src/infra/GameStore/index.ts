import Connect4Repo from '../../types/Connect4Repo'
import YatzyRepo from '../../types/YatzyRepo'
import CharadesRepo from '../../types/CharadesRepo'
import GamesStore from '../../types/GameStore';

export default class GameStore implements GamesStore{
    
    private connect4Repo: Connect4Repo;
    private yatzyRepo: YatzyRepo;
    private charadesRepo: CharadesRepo;

    constructor(infra: {connect4Repo: Connect4Repo, yatzyRepo: YatzyRepo, charadesRepo: CharadesRepo}){
        this.connect4Repo = infra.connect4Repo;
        this.yatzyRepo = infra.yatzyRepo;
        this.charadesRepo = infra.charadesRepo;
    }

    public async getAll(){
        const r1 = (await this.connect4Repo.findMany()).map(el=>({
            id: el.getId(),
            players: el.getPlayers().map(p=>({id: p.id, name: p.name})),
            t: 'connect4',
        }));
        const r2 = (await this.yatzyRepo.findMany()).map(el=>({
            id: el.getId(),
            players: el.getPlayers().map(p=>({id:p.id, name:p.name})),
            t: 'yatzy',
        }));
        const r3 = (await this.yatzyRepo.findMany()).map(el=>({
            id: el.getId(),
            players: el.getPlayers().map(p=>({id:p.id, name:p.name})),
            t: 'charades',
        }));
        
        return [...r1, ...r2, ...r3];
    }

    public async getById(id: string){
        const r1 = await this.connect4Repo.findById(id);
        if(r1) return r1;

        const r2 = await this.yatzyRepo.findById(id);
        if(r2) return r2;
        
        const r3 = await this.charadesRepo.findById(id);
        if(r3) return r3;

        return null;
    }

}