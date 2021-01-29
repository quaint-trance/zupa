import { v4 } from 'uuid'
import { Card } from "../entities/Set";

export default (shuffle = true)=>{
    const deck:Card[] = [];

    [0, 1, 2].forEach(color=>{
        [0, 1, 2].forEach(shape=>{
            [0, 1, 2].forEach(quantity=>{
                [0, 1, 2].forEach(fill=>{
                    deck.push({
                        color,
                        shape,
                        quantity,
                        fill,
                        id: v4(),
                    })
                })
            })
        })
    })

    return shuffle ? shuffleArray(deck) : deck
}




function shuffleArray<T>(array:T[]) {
  let curId = array.length;
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}