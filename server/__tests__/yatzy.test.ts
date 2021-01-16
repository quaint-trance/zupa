import Yatzy from '../src/entities/Yatzy'

const yatzy = Yatzy.create();

describe('join player', ()=>{
    it('no player', ()=>{
        expect(yatzy.getPlayers().length).toBe(0);
    });
    
    it('add players', ()=>{
        yatzy.joinPlayer('mixi_999');
        yatzy.joinPlayer('Piotrek32');
        expect(yatzy.getPlayers().length).toBe(2);
        expect( yatzy.getPlayers().find(p=> p.name === 'mixi_999') ).toBeDefined();
    });
});

describe('dice', ()=>{
    it('first', ()=>{
        const result = yatzy.throwDice([]); 
        expect( result ).toBeDefined();
        if(!result) return;
        expect( result.length ).toBe(5);
        result.forEach(el=>expect(typeof el).toBe('number'));
    });

    it('second', ()=>{
        const result = yatzy.throwDice([true, true, false, false, false, true]); 
        expect( result ).toBeDefined();
        if(!result) return;
        expect( result.length ).toBe(5);
        expect(result[0]).toBeNull();
        expect(result[1]).toBeNull();
        expect(typeof result[2]).toBe('number');
        expect(typeof result[3]).toBe('number');
        expect(typeof result[4]).toBe('number');
    });
})