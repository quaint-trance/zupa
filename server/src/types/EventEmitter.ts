export interface eventType{
    name: string;
    payload?: any;
}

export default interface EventEmitter{
    emit: (events: eventType[], gameId: string) => void,
}