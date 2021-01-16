type emits = 'next turn' | 'win' | 'new player';

export default class eventEmitter{

    emit(t: any, ...data: any){
        if(t === "next turn") return;
        else if(t==="win") return;
        else if(t==="new player") return;

    }
}