import Connect4 from "./entities/Connect4";
import Token from "./entities/Token";
import Yatzy from "./entities/Yatzy";
import GameStoreService from "./services/gameStoreService";
import YatzyService from "./services/yatzyService";
import Connect4Service from "./services/connect4Service";
import GamesStore from "./types/GameStore";

export default (gameStore: GamesStore)=>{
    const entities = {
        Yatzy,
        Token,
        Connect4,
    };

    return{
        yatzyService: new YatzyService(gameStore),
        gameStoreService: new GameStoreService(gameStore),
        connect4Service: new Connect4Service(gameStore),
        entities,
    }
}