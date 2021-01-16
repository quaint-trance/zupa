export default (dice: number[], row: number)=>{
    if(row <= 5)
        return dice.reduce((sum, current)=> sum + (current===row+1 ? current : 0), 0);
    else switch(row){
        case 6:
            dice.sort((a, b)=> b - a);
            for(let i = 1; i < dice.length; i++){
                if( dice[i] === dice[i-1] ) return 2* dice[i]
            }
            return 0;
        case 7:{

            dice.sort((a, b)=> b - a);
            let sum = 0;
            let found = false;
            for(let i = 1; i < dice.length; i++){
                if( dice[i] === dice[i-1] ){
                    sum += 2*dice[i];
                    i++;
                    if(found) return sum;
                    else found = true;
                }
            }
            return 0;
        }
        case 8:{
            dice.sort((a, b)=> b - a);
            for(let i = 2; i < dice.length; i++){
                if( dice[i] === dice[i-1] && dice[i] === dice[i-2]){
                    return 3*dice[i];
                }
            }
            return 0;
        }
        case 9:{
            dice.sort((a, b)=> b - a);
            for(let i = 3; i < dice.length; i++){
                if( dice[i] === dice[i-1] && dice[i] === dice[i-2] && dice[i]===dice[i-3]){
                    return 4*dice[i];
                }
            }
            return 0;
        }
        case 10:{
            dice.sort((a, b)=> b - a);
            if( dice.includes(1) && dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5))
                return 15;
            else return 0;
        }
        case 11:{
            dice.sort((a, b)=> b - a);
            if( dice.includes(6) && dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5))
                return 20;
            else return 0;
        }
        case 12:{
            let sum = 0;
            let threeIndex = -1;
            dice.sort((a, b)=> b - a);
            for(let i = 2; i < dice.length; i++){
                if( dice[i] === dice[i-1] && dice[i] === dice[i-2]){
                    threeIndex = i;
                    sum = 3*dice[i];
                    break;
                }
            }
            if(threeIndex < 0) return 0;
            
            dice = dice.filter((e, index)=> ![threeIndex, threeIndex-1, threeIndex-2].includes(index))
            for(let i = 1; i < dice.length; i++){
                if( dice[i] === dice[i-1]){
                    return sum + 2*dice[i];
                }
            }
            return 0;
        }
        case 13:{
            return dice.reduce((sum, current)=>sum+current, 0)
        }
        case 14:{
            if( dice.every(n => n===dice[0]) )
                return 50;
            return 0;
        }
    }

}