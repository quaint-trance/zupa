import calcScore from '../src/utils/calcScore'
describe('calcScore', ()=>{
    it('numbers', ()=>{
        expect(calcScore([1, 1, 1, 1, 1], 0)).toBe(5);
        expect(calcScore([6, 2, 1, 5, 1], 0)).toBe(2);
        expect(calcScore([6, 2, 1, 5, 1], 4)).toBe(5);
        expect(calcScore([6, 2, 1, 5, 1], 2)).toBe(0);
    });
    it('one pair', ()=>{
        expect(calcScore([4, 2, 4, 3, 6], 6)).toBe(8);
        expect(calcScore([6, 5, 2, 4, 1], 6)).toBe(0);
    });
    it('two pair', ()=>{
        expect(calcScore([2, 5, 4, 4, 2], 7)).toBe(12);
        expect(calcScore([3, 2, 3, 4, 4], 7)).toBe(14);
        expect(calcScore([2, 2, 2, 4, 3], 7)).toBe(0);
    });
    it('three of kind', ()=>{
        expect(calcScore([1, 1, 1, 1, 1], 8)).toBe(3);
        expect(calcScore([3, 3, 2, 2, 2], 8)).toBe(6);
        expect(calcScore([3, 3, 1, 2, 2], 8)).toBe(0);
        
    });
    it('four of kind', ()=>{
        expect(calcScore([1, 1, 1, 1, 1], 9)).toBe(4);
        expect(calcScore([2, 3, 2, 2, 2], 9)).toBe(8);
        expect(calcScore([3, 3, 2, 2, 2], 9)).toBe(0);
    });
    it('low stright', ()=>{
        expect(calcScore([1, 3, 2, 5, 4], 10)).toBe(15);
        expect(calcScore([6, 3, 2, 5, 4], 10)).toBe(0);

    });
    it('high stright', ()=>{
        expect(calcScore([1, 3, 2, 5, 4], 11)).toBe(0);
        expect(calcScore([6, 3, 2, 5, 4], 11)).toBe(20);
        
    });
    it('full house', ()=>{
        expect(calcScore([6, 6, 6, 5, 5], 12)).toBe(28);
        expect(calcScore([6, 6, 6, 6, 6], 12)).toBe(30);
        expect(calcScore([6, 6, 2, 6, 6], 12)).toBe(0);
    });
    it('? ? ? ? ?', ()=>{
        expect(calcScore([6, 3, 2, 5, 4], 13)).toBe(20);
        expect(calcScore([1, 2, 1, 2, 6], 13)).toBe(12);
    });
    it('yatzy', ()=>{
        expect(calcScore([1, 1, 1, 1, 1], 14)).toBe(50);
        expect(calcScore([6, 6, 6, 6, 6], 14)).toBe(50);
        expect(calcScore([6, 6, 6, 6, 5], 14)).toBe(0);
    });
});