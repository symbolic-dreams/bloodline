export class TileMap {
    constructor({ id, width, height, tileSheet, tiles }) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.tileSheet = tileSheet;
        this.tiles = tiles;
    }
}