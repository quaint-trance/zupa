import random from './random'

export default ()=>{
    const charades = [
       "zupa",
       "twój stary",
       "piwo",
       "szachy",
       "kefir",
       "miasto pochodzenia",
       "zielona kiełbasa",
       "student",
       "technologia",
        
    ];

    return charades[random(0, charades.length-1)];
}