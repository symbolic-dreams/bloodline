import { Repository } from "../application/Repository.mjs";
import { Tile } from "../domain/Tile.mjs";

export class TileRepository extends Repository {
    constructor({ baseUrl, size }) {
        super();
        this.baseUrl = baseUrl;
        this.size = size;
    }

    get(id) {
        const url = `${this.baseUrl}/${id}-${this.size}.png`;
        return new Tile({ id, size: this.size, url });
    }
}