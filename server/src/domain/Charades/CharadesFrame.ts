import { CharadesData, Chunk, Player } from './CharadesTypes'

export default class CharadesFrame{
    
    protected id: CharadesData['id'];
    protected players: CharadesData['players'];
    protected drawing: CharadesData['drawing'];
    protected eventStack: CharadesData['eventStack'];
    protected canvas: CharadesData['canvas'];
    protected charade: CharadesData['charade'];
    protected roundId: CharadesData['roundId'];
    protected timeouts: CharadesData['timeouts'];
    public t: 'charades';
    
    protected constructor(data: Omit<CharadesData, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.drawing = data.drawing;
        this.eventStack = [];
        this.canvas = data.canvas;
        this.charade = data.charade;
        this.roundId = data.roundId;
        this.timeouts = data.timeouts;
        this.t = 'charades';
    };
    
    public getId(){
        return this.id;
    }
    
    public getPlayers(){
        return this.players;
    }
    
    public getCurrentPlayer(){
        if(this.drawing < 0 || !this.players[this.drawing]) return null;
        return this.players[this.drawing];
    }
    
    public getScoreboard(){
        return this.players
        .map(p=>({score: p.score, name: p.name}))
        .sort((a, b)=> b.score - a.score);
    }
    
    public getData():Omit<CharadesData, 'eventStack'>{
        return {
            id: this.id,
            players: this.players,
            drawing: this.drawing,
            canvas: this.canvas,
            charade: this.charade,
            roundId: this.roundId,
            timeouts: this.timeouts,
        };
    }
    
    public getAll():CharadesData{
        return {
            ...this.getData(),
            eventStack: this.eventStack,
        }
    }

    public getEvents(){
        return this.eventStack;
    }
    
}