export default (board: string[][], connectToWin: number)=>{

    for(let column = 0; column < board.length; column++){  
        for(let row = 0; row < board[column].length; row++){
            const id = board[column][row];
            if(!id) continue;
            
            try{
                //horizontal ←→
                const result = (new Array(connectToWin)).fill(0).every((t, offset)=>{
                    return board[column+offset][row] === id;
                });
                if(result) return id;
            }catch{}

            try{
                //vertical |
                const result = (new Array(connectToWin)).fill(0).every((t, offset)=>{
                    return board[column][row+offset] === id;
                });
                if(result) return id;
            }catch{}

            try{
                //slash /
                const result = (new Array(connectToWin)).fill(0).every((t, offset)=>{
                    return board[column+offset][row+offset] === id;
                });
                if(result) return id;
            }catch{}

            try{
                //backslash \
                const result = (new Array(connectToWin)).fill(0).every((t, offset)=>{
                    return board[column+offset][row-offset] === id;
                });
                if(result) return id;

            }catch{}



        }
    }

    return false;
}