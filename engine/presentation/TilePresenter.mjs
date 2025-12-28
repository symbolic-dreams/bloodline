import { Presenter } from "../application/Presenter.mjs";

export class TilePresenter extends Presenter {
    constructor(elContainer) {
        super();
        this.elContainer = elContainer;
    }

    present(tile) {
        const htmlTile = Object.assign(document.createElement('img'), {
            src: tile.url,
            width: tile.size,
            height: tile.size,
            alt: `tile ${tile.id}`
        });
        this.elContainer.appendChild(htmlTile);
    }
}