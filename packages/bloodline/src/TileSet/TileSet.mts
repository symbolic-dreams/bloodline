import { Entity } from '~/Entity.mjs';
import { Properties } from '~/types/Properties.mjs';
import { Tile } from './Tile.mjs';

/**
 * A set of tiles that can be used to create a map.
 * @see Tile
 */
export class TileSet extends Entity<string> {
    [index: number]: Tile;
    [Symbol.iterator]() { return this.#tiles[Symbol.iterator](); }

    #tileSize: number;
    #tiles: Tile[];

    constructor({ id, tileSize, tiles }: Properties<TileSet>) {
        super({ id });

        this.#tileSize = tileSize;
        this.#tiles = tiles;
    }

    /**
     * The tiles in the set.
     */
    get tiles() { return this.#tiles; }

    /**
     * The size of each tile in the set.
     */
    get tileSize() { return this.#tileSize; }
}