import random from './random'

export default ()=>{
    const charades = [
        "abituria",
        "abiturient",
        "abiturientka",
        "abituryna",
        "abiudykacja",
        "abiuracja",
        "abkracer",
        "ablacja",
        "ablaktacja",
        "ablaktowanie",
        "ablativus",
        "ablatiwus",
        "ablatyw",
        "ablegat",
        "ableger",
        "ablegier",
        "ablegierek",
        "ablegrowanie",
        "ableizm",
        "ablena",
        "ablucja",
        "ablutofobia",
        "ablutomania",
        "ablyger",
        "ablyjger",
        "abnegacja",
        "abnegat",
        "abolicja",
        "abolicjonista",
        "abolicjonistka",
        "abolicjonizm",
        "abominacja",
    ];

    return charades[random(0, charades.length)];
}