import { Camera } from './Camera.mjs';
import { Presenter } from './Presenter.mjs';
import { TileMap, TileMapJson } from './TileMap.mjs';

export abstract class Game extends Presenter<TileMap> {
    #map?: TileMap;
    #camera?: Camera;

    loadMap(tileMap: TileMapJson) {
        const { height, width } = this.#map = new TileMap(tileMap);
        this.#camera = new Camera({ x: 0, y: 0, height, width, });
    }

    start() {

    }
}