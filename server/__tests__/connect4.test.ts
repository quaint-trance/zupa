import Connect4 from '../src/entities/Connect4'

const connect4 = Connect4.create();

describe('join player', ()=>{
    it('no player', ()=>{
        expect(connect4.getPlayers().length).toBe(0);
    });
    
    it('add players', ()=>{
        connect4.joinPlayer('mixi_999');
        connect4.joinPlayer('Piotrek32');
        expect(connect4.getPlayers().length).toBe(2);
        expect( connect4.getPlayers().find(p=> p.name === 'mixi_999') ).toBeDefined();
    });
});

connect4.startGame();

describe('choose filed', ()=>{
    it('first', ()=>{
        const result = connect4.chooseColumn(3);
        expect( result ).toBeDefined();
        if(result === null) return;
        expect( result ).toBe(0);
    });
    
    it('second', ()=>{
        const result = connect4.chooseColumn(3);
        expect( result ).toBeDefined();
        if(result === null) return;
        expect( result ).toBe(1);
    });
    
    it('other column', ()=>{
        const result = connect4.chooseColumn(1);
        expect( result ).toBeDefined();
        if(result === null) return;
        expect( result ).toBe(0);
    });

    it('overflow', ()=>{
        for(let i = 0; i < 6; i++){
            const result = connect4.chooseColumn(5);
        }
        const result = connect4.chooseColumn(5);
        expect(result).toBe(null);        
    });
})