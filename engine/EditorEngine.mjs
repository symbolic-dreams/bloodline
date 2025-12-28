import { EditorInteractor } from "./application/EditorInteractor.mjs";
import { TileMapRepository } from "./data/TileMapRepository.mjs";
import { TileSheetRepository } from "./data/TileSheetRepository.mjs";
import { EditorPresenter } from "./presentation/EditorPresenter.mjs";

export class EditorEngine {
    constructor({ baseUrl, size, container }) {
        this.tileSheetRepository = new TileSheetRepository({ baseUrl, tileSize: size });
        this.tileMapRepository = new TileMapRepository({ baseUrl, size });
        this.container = container;
        this.size = size;
    }

    async createNew({ width, height, tileSheetId }) {
        const presenter = new EditorPresenter({
            container: this.container,
            onTileSelect: (tileId) => this.interactor.selectTile(tileId),
            onMapClick: (x, y) => this.interactor.placeTile({ x, y })
        });

        this.interactor = new EditorInteractor({
            tileSheetRepository: this.tileSheetRepository,
            tileMapRepository: this.tileMapRepository,
            presenter
        });

        await this.interactor.createNewMap({
            width,
            height,
            tileSheetId,
            size: this.size
        });

        this._wireUpButtons({ width, height, tileSheetId }, presenter);
    }

    async loadMap(mapId) {
        const presenter = new EditorPresenter({
            container: this.container,
            onTileSelect: (tileId) => this.interactor.selectTile(tileId),
            onMapClick: (x, y) => this.interactor.placeTile({ x, y })
        });

        this.interactor = new EditorInteractor({
            tileSheetRepository: this.tileSheetRepository,
            tileMapRepository: this.tileMapRepository,
            presenter
        });

        await this.interactor.loadMap(mapId);

        this._wireUpButtons({ width: 10, height: 10, tileSheetId: 'default' }, presenter);
    }

    _wireUpButtons({ width, height, tileSheetId }, presenter) {
        presenter.newMapButton.addEventListener('click', () => {
            if (confirm('Create a new map? Unsaved changes will be lost.')) {
                this.createNew({ width, height, tileSheetId });
            }
        });

        presenter.loadMapButton.addEventListener('click', () => {
            const mapId = prompt('Enter map ID to load:');
            if (mapId) {
                this.loadMap(mapId).catch(err => {
                    alert('Failed to load map: ' + err.message);
                });
            }
        });

        presenter.saveMapButton.addEventListener('click', () => {
            const json = this.interactor.exportMap(),
                blob = new Blob([json], { type: 'application/json' }),
                url = URL.createObjectURL(blob),
                a = Object.assign(document.createElement('a'), {
                    href: url,
                    download: 'tilemap.json'
                });

            a.click();
            URL.revokeObjectURL(url);
        });
    }
}