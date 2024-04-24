import { Repository } from '~/Repository.mjs';
import { TileMap } from './TileMap.mjs';
import { TileSetRepository } from '~/TileSet/TileSetRepository.mjs';
import { MapCell } from './MapCell.mjs';

export interface TileMapJson {
    cells: number[][][];
    cellsDown: number;
    cellsAcross: number;
    tileSetId: string;
    tileSize: number;
}

export class TileMapRepository extends Repository<TileMap> {
    #tileMaps; #tileSets;

    constructor(
        tileMaps: Map<string, { json: TileMapJson }>,
        tileSets: Map<string, { size: number; url: string }>
    ) {
        super();

        this.#tileMaps = tileMaps;
        this.#tileSets = tileSets;
    }

    async get(id: string): Promise<TileMap> {
        const json = this.#tileMaps.get(id)?.json;

        if (!json)
            throw new Error(`Tile map with id '${id}' not found`);

        const { cellsAcross: width, cellsDown: height, tileSetId, cells } = json,
            tileSetRepository = new TileSetRepository(this.#tileSets),
            tileSet = await tileSetRepository.get(tileSetId),
            tileMap = new TileMap({
                id, width, height, tileSet,
                cells: cells.map(row => row.map(cell => new MapCell({
                    tiles: cell.map(id => tileSet.tiles[id])
                })))
            });

        return tileMap;
    }
}