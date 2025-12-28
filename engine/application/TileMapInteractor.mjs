import { Interactor } from "./Interactor.mjs";

export class TileMapInteractor extends Interactor {
    constructor({ presenter, repository }) {
        super();
        this.presenter = presenter;
        this.repository = repository;
    }

    async loadTileMap(id) {
        const tileMap = await this.repository.get(id);
        this.presenter.present(tileMap);
    }
}