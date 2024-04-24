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

    override async get(id: string) {
        const tileSetRegistry = this.#tileSets.get(id);

        if (!tileSetRegistry)
            throw new Error(`Tile set with id '${id}' not found`);

        const { size, url } = tileSetRegistry,
            response = await fetch(url),
            blob = await response.blob(),
            tileSetImage = await createImageBitmap(blob),
            { width, height } = tileSetImage;

        return new TileSet({
            id,
            tileSize: size,
            tiles: Array.from({ length: width / size * height / size },
                (_, i) => new Tile({ id: i, size, tileSetImage })
            )
        });
    }
}