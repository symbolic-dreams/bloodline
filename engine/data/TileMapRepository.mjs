import { TileMap } from "../domain/TileMap.mjs";
import { Repository } from "../application/Repository.mjs";
import { TileSheetRepository } from "./TileSheetRepository.mjs";

export class TileMapRepository extends Repository {
    constructor({ baseUrl, size }) {
        super();
        this.baseUrl = baseUrl;
        this.tileSheetRepository = new TileSheetRepository({ baseUrl, tileSize: size });
    }

    async get(id) {
        const response = await fetch(`${this.baseUrl}/maps/${id}.json`),
            json = await response.json(),
            { width, height, tileSheetId, tileIds } = json,
            tileSheet = await this.tileSheetRepository.get(tileSheetId),
            tiles = tileIds.map(row => row.map(tileId => tileSheet.tiles[tileId]));

        return new TileMap({ id, width, height, tileSheet, tiles });
    }
}