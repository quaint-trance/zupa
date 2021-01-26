interface TimeoutInterface{
    callback: ()=>void;
    time: number;
}

export default class Timeout implements TimeoutInterface{
    callback: TimeoutInterface['callback'];
    time: number;

    constructor(callback: TimeoutInterface['callback'], time: TimeoutInterface['time']){
        this.callback = callback;
        this.time = time;

        setTimeout(callback, time);
    }
}