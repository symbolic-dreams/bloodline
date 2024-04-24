import { Repository } from '~/Repository.mjs';
import { TileSet } from './TileSet.mjs';
import { Tile } from './Tile.mjs';

export class TileSetRepository extends Repository<TileSet> {
    #tileSets;

    constructor(
        tileSets: Map<string, { size: number; url: string }>
    ) {
        super();
        this.#tileSets = tileSets;
    }

    async #loadTiles(url: string, size: number) {
        const response = await fetch(url),
            blob = await response.blob(),
            image = await createImageBitmap(blob),
            { width, height } = image,
            tiles = await Promise.all(
                Array.from({ length: width / size * height / size }, async (_, i) => {
                    const x = i % (width / size) * size,
                        y = Math.floor(i / (width / size)) * size,
                        img = await createImageBitmap(image, x, y, size, size);

                    return new Tile({ id: i, size, image: img });
                })
            );
        // No need to keep the original image in memory after we've created the tiles
        image.close();

        return tiles;
    }

    override async get(id: string) {
        const tileSetReg = this.#tileSets.get(id);

        if (!tileSetReg)
            throw new Error(`Tile set with id '${id}' not found`);

        const { size, url } = tileSetReg,
            tiles = await this.#loadTiles(await url, size);

        return new TileSet({
            id,
            tileSize: size,
            tiles
        });
    }
}