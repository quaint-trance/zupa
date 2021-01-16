export default (board: string[][])=>{
    let result:false|string = false;
    board.forEach((c, ci)=>{
        c.forEach((r, ri)=>{
            if([0, 1, 2, 3].every(toAdd => board[ci][ri+toAdd] === r)) result =  r;
            if([0, 1, 2, 3].every(toAdd => board[ci+toAdd][ri] === r)) result =  r;
            if([0, 1, 2, 3].every(toAdd => board[ci+toAdd][ri+toAdd] === r)) result =  r;
        })
    })
    return result;
}