import { Card } from "../entities/Set";

export default (cards: Card[]) =>{
    type tp = 'color';
    const props:tp[] = ['color'];
    return props.every(prop=>{
        const r0 = cards.every( card => card[prop] === cards[0][prop] );
        const r1 = cards[0][prop] !== cards[1][prop] && cards[0][prop] !== cards[2][prop] && cards[1][prop] !== cards[2][prop];
        return r0 || r1;
    });
}