import jwt from 'jsonwebtoken'

export default class Token{
    token: string;
    payload: any;

    constructor(token: string, payload: any){
        this.token = token;
        this.payload = payload;
    }

    static create(payload: any){
        const token = jwt.sign(payload, 'secret');
        return new Token(token, payload);
    }

    static hydrate(token: string){
        const payload = jwt.verify(token, 'secret');
        return new Token(token, payload);
    }

    getToken(){
        return this.token;
    }

    getPayload(){
        return this.payload;
    }
}