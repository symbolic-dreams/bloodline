import { Entity } from '~/Entity.mjs';
import { Rectangle } from '~/Rectangle.mjs';
import { Properties } from '~/types/Properties.mjs';

/**
 * A Tile is a standard sized bitmap image, part of a tile set.
 * @see TileSet
 */
export class Tile extends Entity<number> {
    readonly tileSetImage!: ImageBitmap;

    /**
     * The size of the tile.
     */
    readonly size!: number;

    /**
     * The rectangle in the tile set image that contains this tile.
     */
    readonly sourceRect!: Rectangle;

    constructor({ id, ...rest }: Properties<Omit<Tile, 'sourceRect'>>) {
        super({ id });

        Object.assign(this, rest);

        const { tileSetImage, size } = this,
            { width: tWidth } = tileSetImage,
            tileY = Math.floor(id / (tWidth / size)),
            tileX = id % (tWidth / size);

        this.sourceRect = new Rectangle({
            x: tileX * size,
            y: tileY * size,
            width: size,
            height: size
        });
    }
}