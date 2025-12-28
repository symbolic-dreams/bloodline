import { TileMapInteractor } from "./application/TileMapInteractor.mjs";
import { TileMapRepository } from "./data/TileMapRepository.mjs";
import { TileMapPresenter } from "./presentation/TileMapPresenter.mjs";

export class Engine {
    constructor({ baseUrl, size, elContainer }) {
        this.interactor = new TileMapInteractor({
            repository: new TileMapRepository({ baseUrl, size }),
            presenter: new TileMapPresenter({ container: elContainer })
        });
    }

    async renderMap(mapId) {
        await this.interactor.loadTileMap(mapId);
    }
}