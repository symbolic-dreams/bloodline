import { Interactor } from "./Interactor.mjs";

export class TileInteractor extends Interactor {
    constructor({ repository, presenter }) {
        super();
        this.repository = repository;
        this.presenter = presenter;
    }

    renderTile(id) {
        const tile = this.repository.get(id);
        this.presenter.present(tile);
    }
}