/*!
 * @license
 * Copyright (C) 2020 Michael L Haufe
 * SPDX-License-Identifier: AGPL-3.0-only
 * @see <https://spdx.org/licenses/AGPL-3.0-only.html>
 */

type Radian = number;

class Vector2 {
    constructor(
        readonly a: number,
        readonly b: number
    ) {}

    /**
     * <a,b> + <c,d> = <a+c,b+d>
     * @param {Vector2} vector2 -
     * @returns {Vector2} -
     */
    add(vector2: Vector2): Vector2 {
        return new Vector2(this.a + vector2.a, this.b + vector2.b);
    }

    /**
     * Returns the angle of the vector
     * @returns {Radian} - The angle
     */
    direction(): Radian { return Math.atan(this.b / this.a); }

    /**
     * Determines if the current vector is a unit vector
     * @returns {boolean} -
     */
    isUnit(): boolean { return this.magnitude() == 1; }

    /**
     * Determines if the current vector is a zero vector
     * @returns {boolean} -
     */
    isZero(): boolean { return this.magnitude() == 0; }

    /**
     * Returns the length of the vector
     * @returns {number} -
     */
    magnitude(): number { return Math.hypot(this.a, this.b); }

    /**
     * Stretches or shrinks the vector without changing the direction
     * @param {number} number - The scale amount
     * @returns {Vector2} -
     */
    scale(number: number): Vector2 {
        return new Vector2(number * this.a, number * this.b);
    }

    /**
     * <a,b> - <c,d> = <a-c,b-d>
     * @param {Vector2} vector2 -
     * @returns {Vector2} -
     */
    sub(vector2: Vector2): Vector2 {
        return new Vector2(this.a - vector2.a, this.b - vector2.b);
    }

    /**
     * Returns a string representation of the vector in cartesian form
     * @returns {string} -
     */
    toString(): string { return `<${this.a}, ${this.b}>`; }
}

/**
 * The standard basis vector <1, 0>
 */
class BasisX extends Vector2 {
    constructor(){ super(1, 0); }

    direction(): Radian { return 0; }
}

/**
 * The standard basis vector <0, 1>
 */
class BasisY extends Vector2 {
    constructor(){ super(0, 1); }

    direction(): Radian { return Math.PI / 2; }
}

/**
 * The 2D point vector <x,y>
 */
class Cartesian extends Vector2 {
    constructor(
        readonly x: number,
        readonly y: number
    ) { super(x, y); }
}

/**
 * A polar point
 */
class Polar extends Vector2 {
    constructor(magnitude: number, direction: Radian) {
        super(magnitude * Math.cos(direction), magnitude * Math.sin(direction));
    }
}

/**
 * A vector with a magnitude of 1
 */
class Unit extends Vector2 {
    constructor() { super(1, 0); }

    direction(): Radian { return 0; }
}

/**
 * The Zero vector <0, 0>
 */
class Zero extends Vector2 {
    constructor() { super(0, 0); }

    add(vector2: Vector2): Vector2 { return vector2; }

    direction(): Radian { return 0; }
}

export {Vector2, BasisX, BasisY, Cartesian, Polar, Unit, Zero};