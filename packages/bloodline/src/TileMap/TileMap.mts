import { Entity } from '~/Entity.mjs';
import { Properties } from '../types/Properties.mjs';
import { MapCell, TileSet } from '~/index.mjs';

/**
 * A collection of Cells
 * @see Cell
 */
export class TileMap extends Entity<string> {
    #height: number;
    #width: number;
    #tileSet: TileSet;
    #cells: MapCell[][];

    constructor({ id, height, width, tileSet, cells }: Properties<TileMap>) {
        super({ id });
        const cs = cells.flat();
        if (cs.length < 1)
            throw new Error('TileMap must have at least one cell');

        this.#height = height;
        this.#width = width;
        this.#cells = cells;
        this.#tileSet = tileSet;
    }

    get cells() { return this.#cells; }

    get height() { return this.#height; }

    get width() { return this.#width; }

    get tileSet() { return this.#tileSet; }
}