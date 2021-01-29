import Set from "../src/entities/Set";

const set = Set.create(false);

describe('join player', ()=>{
    it('no player', ()=>{
        expect(set.getPlayers().length).toBe(0);
    });
    
    it('add players', ()=>{
        set.joinPlayer('mixi_999');
        set.joinPlayer('Piotrek32');
        expect(set.getPlayers().length).toBe(2);
        expect( set.getPlayers().find(p=> p.name === 'mixi_999') ).toBeDefined();
    });
});

describe('start', ()=>{
    it('generate deck', ()=>{
        const deck = set.getData().deck;
        expect( deck.length ).toBe(81);
        
        const result = deck.every(card=>
            deck.every(compare =>{
                if(card.id === compare.id) return true;
                return compare.color !== card.color ||
                compare.fill !== card.fill ||
                compare.shape !== card.shape ||
                compare.quantity !== card.quantity
            })
        );
        expect( result ).toBe(true);
    });
    it('start', ()=>{
        set.startGame();
    });
});

describe('find', ()=>{
    
    it('should return true when correct set found', ()=>{
        const cards = set.getData().table;
        const result = set.chooseCards([ cards[0].id, cards[1].id, cards[2].id], set.getData().players[0].id);
        expect( result ).toBe( true );
    });
    
    it('---||---', ()=>{
        const cards = set.getData().table;
        const result = set.chooseCards([ cards[0].id, cards[1].id, cards[2].id], set.getData().players[0].id);
        expect( result ).toBe( true );
    });

    it('should return false when incorrect set found', ()=>{
        const cards = set.getData().table;
        const result = set.chooseCards([ cards[0].id, cards[5].id, cards[2].id], set.getData().players[0].id);
        expect( result ).toBe( true );
    });

    it('should add new cards when set found', ()=>{
        expect( set.getData().table.length ).toBe(9);
    });

});