export abstract class Vector {
    [index: number]: number;
    [Symbol.iterator]() { return this.#components[Symbol.iterator](); }

    #components: readonly number[];

    get components() { return this.#components; }

    constructor(...components: number[]) {
        this.#components = components;
    }

    distanceTo([...vs]: Vector): number {
        const us = this.#components;

        return Math.hypot(...vs.map((v, i) => v - us[i]));
    }
}

export class Vector2 extends Vector {
    // <a, b> x <c, d> = ad - bc
    cross([c, d]: Vector2): number {
        const [a, b] = this;

        return a * d - b * c;
    }
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