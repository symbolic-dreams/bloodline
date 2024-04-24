import { Entity } from '~/Entity.mjs';
import { Properties } from '~/types/Properties.mjs';

/**
 * A Tile is a standard sized bitmap image, part of a tile set.
 * @see TileSet
 */
export class Tile extends Entity<number> {
    #size: number;
    #image: ImageBitmap;

    constructor({ id, size, image }: Properties<Tile>
    ) {
        super({ id });

        this.#size = size;
        this.#image = image;
    }

    /**
     * The size of the tile.
     */
    get size() { return this.#size; }

    /**
     * The image of the tile.
     */
    get image() { return this.#image; }
}