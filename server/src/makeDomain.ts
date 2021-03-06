import Connect4 from "./domain/entities/Connect4";
import Token from "./domain/entities/Token";
import Yatzy from "./domain/entities/Yatzy";
import GameStoreService from "./services/gameStoreService";
import YatzyService from "./services/yatzyService";
import Connect4Service from "./services/connect4Service";
import GamesStore from "./types/GameStore";
import Charades from "./domain/entities/Charades";
import CharadesService from "./services/charadesService";
import SetService from "./services/setService";
import User from "./domain/User/User";
import UserService from "./services/userService";
import { UserStore } from "./types/UserStore";
import Skin from "./domain/entities/Skin";
import { SkinStore } from "./types/SkinStore";
import SkinService from "./services/skinService";

export default (gameStore: GamesStore, userStore: UserStore, skinStore: SkinStore)=>{
    
    const valueObjects = {
        Skin: Skin(skinStore),
    }

    const entities = {
        Yatzy,
        Token,
        Connect4,
        Charades,
        Set,

        User: User(valueObjects.Skin),
    };

    return{
        yatzyService: new YatzyService(gameStore),
        gameStoreService: new GameStoreService(gameStore),
        connect4Service: new Connect4Service(gameStore, userStore, entities.User),
        charadesService: new CharadesService(gameStore),
        setService: new SetService(gameStore),
        
        skinService: new SkinService(skinStore, valueObjects.Skin, userStore, entities.User),
        userService: new UserService(userStore, entities.User),
        entities,
    }
}