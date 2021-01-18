export default (board: string[][])=>{

    for(let ci = 3; ci < board.length; ci++){
        for(let ri = 0; ri < board[ci].length; ri++){
            const id = board[ci][ri];
            if(!id) continue;
            if([0, 1, 2, 3].every(toAdd => board[ci-toAdd][ri] === id)) return id;
        }
    }
    
    for(let ci = 0; ci < board.length; ci++){
        for(let ri = 3; ri < board[ci].length; ri++){
            const id = board[ci][ri];
            if(!id) continue;
            if([0, 1, 2, 3].every(toAdd => board[ci][ri-toAdd] === id)) return id;
        }
    }
    
    for(let ci = 3; ci < board.length; ci++){
        for(let ri = 3; ri < board[ci].length; ri++){
            const id = board[ci][ri];
            if(!id) continue;
            if([0, 1, 2, 3].every(toAdd => board[ci-toAdd][ri-toAdd] === id)) return id;
        }
    }
    
    return false;
}