import { TileSheet } from "../domain/TileSheet.mjs";
import { Tile } from "../domain/Tile.mjs";
import { Repository } from "../application/Repository.mjs";

export class TileSheetRepository extends Repository {
    constructor({ baseUrl, tileSize }) {
        super();
        this.baseUrl = baseUrl;
        this.tileSize = tileSize;
    }

    async get(id) {
        const url = `${this.baseUrl}/sheets/${id}-${this.tileSize}.png`,
            response = await fetch(url),
            blob = await response.blob(),
            image = await createImageBitmap(blob),
            { width, height } = image,
            tilePromises = [];

        for (let y = 0; y < height; y += this.tileSize) {
            for (let x = 0; x < width; x += this.tileSize) {
                tilePromises.push(createImageBitmap(image, x, y, this.tileSize, this.tileSize));
            }
        }

        const tileBitmaps = await Promise.all(tilePromises),
            tiles = tileBitmaps.map((imageBitmap, index) => 
                new Tile({ id: index, size: this.tileSize, imageBitmap })
            );

        image.close(); // No need to keep the image in memory after we've created the tiles

        return new TileSheet({ id, tileSize: this.tileSize, tiles });
    }
}