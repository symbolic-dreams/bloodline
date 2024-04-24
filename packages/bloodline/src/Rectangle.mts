import { Properties } from './types/Properties.mjs';

/**
 * A rectangle with a top-left corner at (x, y) and a width and height
 */
export class Rectangle {
    readonly x!: number;
    readonly y!: number;
    readonly width!: number;
    readonly height!: number;

    constructor(properties: Properties<Rectangle>) {
        Object.assign(this, properties);
    }
}