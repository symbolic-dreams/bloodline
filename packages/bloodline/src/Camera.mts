import { Vector2 } from './Vector.mjs';

export class Camera {
    #position: Vector2;
    #height: number;
    #width: number;

    constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
        this.#position = new Vector2(x, y);
        this.#height = height;
        this.#width = width;
    }

    get height() { return this.#height; }
    get width() { return this.#width; }
    get position() { return this.#position; }
}