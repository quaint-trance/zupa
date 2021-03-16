import Hanoi from '../src/domain/Hanoi'

const hanoi = Hanoi.create();

describe('Hanoi entity', ()=>{

    it('should properly move disks', ()=>{
        hanoi.joinPlayer('Piotrek32')
        hanoi.startGame();

        hanoi.move(0, 1);
        hanoi.move(0, 1);
        hanoi.move(0, 2);
        hanoi.move(1, 2);
        hanoi.move(0, 1);
        hanoi.move(1, 2);
        hanoi.move(2, 1);
        hanoi.move(2, 0);
        hanoi.move(1, 2);
        hanoi.move(0, 1);

        expect(hanoi.getAll().rods[0]).toStrictEqual([5, 4]);
        expect(hanoi.getAll().rods[1]).toStrictEqual([3, 2]);
        expect(hanoi.getAll().rods[2]).toStrictEqual([1]);
        hanoi.reset();
    })
    
    
    it('should hanle win', async (done)=>{
        hanoi.reset();

        const mv = [1,3,1,2,3,2,1,3,2,1,2,3,1,3,1,2,3,2,3,1,2,1,3,2,1,3,1,2,3,2,1,3,2,1,2,3,1,3,2,1,3,2,3,1,2,1,2,3,1,3,1,2,3,2,1,3,2,1,2,3,1,3]
        
        for(let i = 0; i < mv.length; i+=2){
            hanoi.move(mv[i]-1, mv[i+1]-1);
        }

        const e = hanoi.getEvents().find(el=>el.name==='win');
        expect( e ).toBeDefined();
        expect( typeof e?.payload ).toBe('number');
        done();
    });


});

async function solve(){

    async function wait(n){
        return new Promise(resolve=>{
            setTimeout(resolve, n);
        });
    }
    
    const mv = [1,3,1,2,3,2,1,3,2,1,2,3,1,3,1,2,3,2,3,1,2,1,3,2,1,3,1,2,3,2,1,3,2,1,2,3,1,3,2,1,3,2,3,1,2,1,2,3,1,3,1,2,3,2,1,3,2,1,2,3]

    const el = [
        document.getElementById('c0'),
        document.getElementById('c1'),
        document.getElementById('c2'),
    ]
    
    for(let i = 0; i < mv.length; i+=2){
        el[mv[i]-1].click();
        el[mv[i+1]-1].click();
        await wait(2000);
    }

    
}