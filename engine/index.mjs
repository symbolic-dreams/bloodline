import { TileInteractor } from "./application/TileInteractor.mjs";
import { TileRepository } from "./data/TileRepository.mjs";
import { TilePresenter } from "./presentation/TilePresenter.mjs";

export class Engine {
    constructor({ baseUrl, size, elContainer }) {
        this.interactor = new TileInteractor({
            repository: new TileRepository({ baseUrl, size }),
            presenter: new TilePresenter(elContainer)
        });
    }

    render(...tileIds) {
        tileIds.forEach(id => this.interactor.renderTile(id));
    }
}