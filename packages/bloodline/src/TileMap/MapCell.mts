import { Tile } from '~/index.mjs';

/**
 *  A portion of a tile-based map representing an area
 */
export class MapCell {
    [index: number]: Tile;
    [Symbol.iterator]() { return this.#tiles[Symbol.iterator](); }

    #tiles: Tile[];

    constructor({ tiles }: { tiles: Tile[] }) {
        this.#tiles = tiles;
    }


    /**
     * The tile ids of the cell
     */
    get tiles() { return this.#tiles; }

    /**
     * The number of tiles in the cell
     */
    get length() { return this.#tiles.length; }
}