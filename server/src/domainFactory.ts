import Connect4 from "./entities/Connect4";
import Token from "./entities/Token";
import Yatzy from "./entities/Yatzy";
import GameStoreService from "./services/gameStoreService";
import YatzyService from "./services/yatzyService";
import Connect4Service from "./services/connect4Service";
import GamesStore from "./types/GameStore";
import Charades from "./entities/Charades";
import CharadesService from "./services/charadesService";
import SetService from "./services/setService";

export default (gameStore: GamesStore)=>{
    const entities = {
        Yatzy,
        Token,
        Connect4,
        Charades,
        Set,
    };

    return{
        yatzyService: new YatzyService(gameStore),
        gameStoreService: new GameStoreService(gameStore),
        connect4Service: new Connect4Service(gameStore),
        charadesService: new CharadesService(gameStore),
        setService: new SetService(gameStore),
        entities,
    }
}