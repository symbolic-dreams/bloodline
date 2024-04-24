import { zipWith } from './zipWith.mjs';

export abstract class Vector {
    [Symbol.iterator]() { return this.#components[Symbol.iterator](); }

    #components: readonly number[];

    get components() { return this.#components; }

    constructor(...components: number[]) {
        this.#components = components;
    }

    add([...vs]: this): this {
        const Cons = this.constructor as any;

        return new Cons(...zipWith(this.#components, vs, (u, v) => u + v));
    }

    distanceTo([...vs]: this): number {
        return Math.hypot(...zipWith(this.#components, vs, (u, v) => v - u));
    }

    divide(scalar: number): this {
        const Cons = this.constructor as any;

        return new Cons(...this.#components.map(c => c / scalar));
    }

    toString(): string {
        return `<${this.#components.join(', ')}>`;
    }
}

export class Vector2 extends Vector {
    // <a, b> x <c, d> = ad - bc
    cross([c, d]: Vector2): number {
        const [a, b] = this;

        return a * d - b * c;
    }
}

export class Point2 extends Vector2 {
    constructor(x: number, y: number) {
        super(x, y);
    }

    get x() { return this.components[0]; }
    get y() { return this.components[1]; }
}

export class Vector3 extends Vector {
    // <a, b, c> x <d, e, f> = <bf - ce, cd - af, ae - bd>
    cross([d, e, f]: Vector3): Vector3 {
        const [a, b, c] = this;

        return new Vector3(
            b * f - c * e,
            c * d - a * f,
            a * e - b * d
        );
    }
}