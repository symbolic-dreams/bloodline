import { Properties } from './types/Properties.mjs';

export interface TileMapJson {
    cells: number[][];
    height: number;
    width: number;
    tileSet: string;
}

/**
 * A collection of Cells
 * @see Cell
 */
export class TileMap {
    #height: number;
    #width: number;
    #cells: number[][];

    constructor({ height, width, cells }: Properties<TileMap>) {
        const cs = cells.flat();
        if (cs.length < 1)
            throw new Error('TileMap must have at least one cell');

        this.#height = height;
        this.#width = width;
        this.#cells = cells;
    }

    get height() {
        return this.#height;
    }

    get width() {
        return this.#width;
    }

    get cells() {
        return this.#cells;
    }
}