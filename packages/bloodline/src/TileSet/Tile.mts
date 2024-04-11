/**
 * A Tile is a standard sized bitmap image, part of a tile set.
 */
export class Tile {
    constructor(
        readonly tileId: number,
        readonly size: number
    ) { }
}