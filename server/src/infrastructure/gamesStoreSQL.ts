//@ts-nocheck
import EventEmitter from '../types/EventEmitter';
import GamesStore, { Game } from '../types/GameStore'
import { PrismaClient } from '@prisma/client'

export default class gamesStore{
    eventEmitter: EventEmitter;
    prisma: PrismaClient;

    constructor(eventEmitter: EventEmitter){
        this.eventEmitter = eventEmitter;
        this.prisma = new PrismaClient();
    }

    findById(id: string):Promise<null | Game>{
        //const result = this.store.find(game => game.id === id);
        return this.prisma['yatzy'].findFirst({
            where:{
                id: id,
            },
            include: {
                players: true
            }
        }).then(result=>{
            if(!result) return null;
            return{
                id: result.id,
                throwCount: result.throwCount,
                turn: result.turn,
                dice: JSON.parse(result.dice),
                players: result.players.map(p=>({...p, usedRows: JSON.parse(p.usedRows)})),
                eventsStack: [],
                t: 'yatzy'
            };
        })
    }

    push(data: Game){
        //this.store.push(data);
        return this.prisma['yatzy'].create({
            data:{
                id: data.id,
                throwCount: data.throwCount,
                turn: data.turn,
                dice: JSON.stringify(data.dice),
                players:{
                    create: data.players.map(p=>({
                        id: p.id,
                        name: p.name,
                        score: p.score,
                        usedRows: JSON.stringify(p.usedRows)
                    }))
                }
            }
        }).then(res=>{return});
    }

    async save(data: Game){
        await this.prisma['yatzy'].update({
            where:{
                id: data.id
            },
            data:{
                throwCount: data.throwCount,
                turn: data.turn,
                dice: JSON.stringify(data.dice),
            }
        });
        const saves = [];
        for(const p of data.players){
            saves.push(this.prisma.player.update({
                where:{
                    id: p.id
                },
                data:{
                    name: p.name,
                    score: p.score,
                    usedRows: JSON.stringify(p.usedRows)
                }
            }).then(res=>{return})
                .catch(err=>{
                    return this.prisma.yatzy.update({
                        where:{
                            id: data.id
                        },
                        data:{
                            players:{
                                create:{
                                    name: p.name,
                                    score: p.score,
                                    id: p.id,
                                    usedRows: JSON.stringify(p.usedRows)
                                }
                            }
                        }
                    })
                })
            )
        }
        await Promise.all(saves);
        this.eventEmitter.emit(data.eventsStack, data.id);
        return true;
    }

    findMany(t?: string):Promise<Game[]>{
        return this.prisma.yatzy.findMany({include:{players: true}})
        .then(res=> res.map(el=>({
                id: el.id,
                throwCount: el.throwCount,
                turn: el.turn,
                dice: JSON.parse(el.dice),
                players: el.players.map(p=>({...p, usedRows: JSON.parse(p.usedRows)})),
                eventsStack: [],
                t: 'yatzy'
        })));
    }
}