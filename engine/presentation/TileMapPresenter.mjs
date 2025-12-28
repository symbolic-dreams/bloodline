import { Presenter } from "../application/Presenter.mjs";

export class TileMapPresenter extends Presenter {
    constructor({ container }) {
        super();
        this.container = container;
    }

    present(tileMap) {
        const { width, height, tiles } = tileMap,
            tileSize = tiles[0][0].size,
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        canvas.width = width * tileSize;
        canvas.height = height * tileSize;

        tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                ctx.drawImage(tile.imageBitmap, x * tileSize, y * tileSize);
            });
        });

        this.container.appendChild(canvas);
    }
}