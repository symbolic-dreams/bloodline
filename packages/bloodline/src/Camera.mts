import { Point2 } from './Vector.mjs';

export class Camera {
    position: Point2;

    constructor({ x, y }: { x: number; y: number }) {
        this.position = new Point2(x, y);
    }

    moveBy(dx: number, dy: number): void {
        this.position = this.position.add(new Point2(dx, dy));
    }

    moveTo(x: number, y: number): void {
        this.position = new Point2(x, y);
    }
}