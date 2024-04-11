import { Game } from '@symbolic-dreams/bloodline';
import defaultMap from './game/maps/default.json'

class DemoGame extends Game {
    static {
        const game = new DemoGame(document.body);
        game.loadMap(defaultMap);
    }
}