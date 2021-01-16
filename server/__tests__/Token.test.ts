import Token from '../src/entities/Token'

describe('Token', ()=>{
    const token = Token.create({ok: true}).getToken();

    it('', ()=>{
        const result = Token.hydrate(token)?.getPayload();

        expect(result.ok).toBe(true);
    })
})