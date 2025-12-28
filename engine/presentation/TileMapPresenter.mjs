import { Presenter } from "../application/Presenter.mjs";

export class TileMapPresenter extends Presenter {
    constructor({ container }) {
        super();
        this.container = container;
    }

    present(tileMap) {
        const { width, height, tileSheet, tiles } = tileMap;
        
        if (!tiles || tiles.length === 0 || !tiles[0] || tiles[0].length === 0)
            return;

        const tileSize = tileSheet.tileSize,
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        canvas.width = width * tileSize;
        canvas.height = height * tileSize;

        tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                ctx.drawImage(tile.imageBitmap, x * tileSize, y * tileSize);
            });
        });

        this.container.innerHTML = '';
        this.container.appendChild(canvas);
    }
}