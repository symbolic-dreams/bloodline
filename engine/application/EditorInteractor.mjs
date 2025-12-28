import { Interactor } from "./Interactor.mjs";
import { TileMap } from "../domain/TileMap.mjs";

export class EditorInteractor extends Interactor {
    constructor({ presenter, tileSheetRepository, tileMapRepository }) {
        super();
        Object.assign(this, {
            presenter,
            tileSheetRepository,
            tileMapRepository,
            currentTileMap: null,
            selectedTileId: 0
        });
    }

    async createNewMap({ width, height, tileSheetId }) {
        const tileSheet = await this.tileSheetRepository.get(tileSheetId),
            tiles = Array.from({ length: height }, () =>
                Array.from({ length: width }, () => tileSheet.tiles[0])
            );

        this.currentTileMap = new TileMap({
            id: 'untitled',
            width,
            height,
            tileSheet,
            tiles
        });

        this.presenter.present(this.currentTileMap);
    }

    async loadMap(mapId) {
        this.currentTileMap = await this.tileMapRepository.get(mapId);
        this.presenter.present(this.currentTileMap);
    }

    selectTile(tileId) {
        this.selectedTileId = tileId;
        this.presenter.highlightSelectedTile(tileId);
    }

    placeTile({ x, y }) {
        if (!this.currentTileMap) return;

        const { tileSheet, tiles } = this.currentTileMap;
        tiles[y][x] = tileSheet.tiles[this.selectedTileId];
        this.presenter.updateMapCell({ x, y, tile: tiles[y][x] });
    }

    exportMap() {
        if (!this.currentTileMap) return null;

        const { width, height, tileSheet, tiles } = this.currentTileMap,
            tileIds = tiles.map(row => row.map(tile => tile.id));

        return JSON.stringify({
            width,
            height,
            tileSheetId: tileSheet.id,
            tileIds
        }, null, 4);
    }
}