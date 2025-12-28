import { Presenter } from "../application/Presenter.mjs";

export class EditorPresenter extends Presenter {
    constructor({ container, onTileSelect, onMapClick }) {
        super();
        Object.assign(this, {
            container,
            onTileSelect,
            onMapClick,
            sheetCanvas: null,
            mapCanvas: null,
            mapContext: null,
            currentTileSheet: null
        });
    }

    present(tileMap) {
        const { tileSheet, width, height, tiles } = tileMap;

        this.currentTileSheet = tileSheet;
        this.container.innerHTML = '';

        this._createTilePalette(tileSheet);
        this._createMapEditor({ width, height, tiles, tileSize: tileSheet.tileSize });
        this._createButtons();

        this.highlightSelectedTile(0);
    }

    _createTilePalette(tileSheet) {
        const tileSize = tileSheet.tileSize,
            sheetContainer = Object.assign(document.createElement('div'), {
                style: 'margin-bottom: 20px;'
            }),
            sheetLabel = Object.assign(document.createElement('h3'), {
                textContent: 'Tile Palette'
            });

        sheetContainer.appendChild(sheetLabel);

        this.sheetCanvas = Object.assign(document.createElement('canvas'), {
            style: 'border: 2px solid #333; cursor: pointer;'
        });

        const tilesPerRow = Math.min(10, tileSheet.tiles.length),
            sheetRows = Math.ceil(tileSheet.tiles.length / tilesPerRow);

        Object.assign(this.sheetCanvas, {
            width: tilesPerRow * tileSize,
            height: sheetRows * tileSize
        });

        const sheetCtx = this.sheetCanvas.getContext('2d');

        tileSheet.tiles.forEach((tile, index) => {
            const x = (index % tilesPerRow) * tileSize,
                y = Math.floor(index / tilesPerRow) * tileSize;
            sheetCtx.drawImage(tile.imageBitmap, x, y);
        });

        this.sheetCanvas.addEventListener('click', (e) => {
            const rect = this.sheetCanvas.getBoundingClientRect(),
                x = Math.floor((e.clientX - rect.left) / tileSize),
                y = Math.floor((e.clientY - rect.top) / tileSize),
                tileId = y * tilesPerRow + x;

            if (tileId < tileSheet.tiles.length)
                this.onTileSelect(tileId);
        });

        sheetContainer.appendChild(this.sheetCanvas);
        this.container.appendChild(sheetContainer);
    }

    _createMapEditor({ width, height, tiles, tileSize }) {
        const mapContainer = document.createElement('div'),
            mapLabel = Object.assign(document.createElement('h3'), {
                textContent: 'Map Editor'
            });

        mapContainer.appendChild(mapLabel);

        this.mapCanvas = Object.assign(document.createElement('canvas'), {
            width: width * tileSize,
            height: height * tileSize,
            style: 'border: 2px solid #333; cursor: crosshair;'
        });

        this.mapContext = this.mapCanvas.getContext('2d');

        tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                this.mapContext.drawImage(tile.imageBitmap, x * tileSize, y * tileSize);
            });
        });

        this._drawGrid({ width, height, tileSize });

        this.mapCanvas.addEventListener('click', (e) => {
            const rect = this.mapCanvas.getBoundingClientRect(),
                x = Math.floor((e.clientX - rect.left) / tileSize),
                y = Math.floor((e.clientY - rect.top) / tileSize);

            this.onMapClick(x, y);
        });

        mapContainer.appendChild(this.mapCanvas);
        this.container.appendChild(mapContainer);
    }

    _drawGrid({ width, height, tileSize }) {
        this.mapContext.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        for (let x = 0; x <= width; x++) {
            this.mapContext.beginPath();
            this.mapContext.moveTo(x * tileSize, 0);
            this.mapContext.lineTo(x * tileSize, height * tileSize);
            this.mapContext.stroke();
        }
        for (let y = 0; y <= height; y++) {
            this.mapContext.beginPath();
            this.mapContext.moveTo(0, y * tileSize);
            this.mapContext.lineTo(width * tileSize, y * tileSize);
            this.mapContext.stroke();
        }
    }

    _createButtons() {
        const buttonsContainer = Object.assign(document.createElement('div'), {
            style: 'margin-top: 20px; display: flex; gap: 10px;'
        });

        this.newMapButton = Object.assign(document.createElement('button'), {
            textContent: 'New Map',
            style: 'padding: 10px 20px; font-size: 16px; cursor: pointer;'
        });

        this.loadMapButton = Object.assign(document.createElement('button'), {
            textContent: 'Load Map',
            style: 'padding: 10px 20px; font-size: 16px; cursor: pointer;'
        });

        this.saveMapButton = Object.assign(document.createElement('button'), {
            textContent: 'Save Map',
            style: 'padding: 10px 20px; font-size: 16px; cursor: pointer;'
        });

        buttonsContainer.appendChild(this.newMapButton);
        buttonsContainer.appendChild(this.loadMapButton);
        buttonsContainer.appendChild(this.saveMapButton);
        this.container.appendChild(buttonsContainer);
    }

    highlightSelectedTile(tileId) {
        if (!this.sheetCanvas || !this.currentTileSheet) return;

        const tileSize = this.currentTileSheet.tileSize,
            tilesPerRow = Math.min(10, this.currentTileSheet.tiles.length),
            ctx = this.sheetCanvas.getContext('2d');

        // Redraw to clear previous highlight
        ctx.clearRect(0, 0, this.sheetCanvas.width, this.sheetCanvas.height);
        this.currentTileSheet.tiles.forEach((tile, index) => {
            const x = (index % tilesPerRow) * tileSize,
                y = Math.floor(index / tilesPerRow) * tileSize;
            ctx.drawImage(tile.imageBitmap, x, y);
        });

        // Draw highlight
        const x = (tileId % tilesPerRow) * tileSize,
            y = Math.floor(tileId / tilesPerRow) * tileSize;

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, tileSize, tileSize);
    }

    updateMapCell({ x, y, tile }) {
        if (!this.mapContext) return;

        const tileSize = tile.size;
        this.mapContext.drawImage(tile.imageBitmap, x * tileSize, y * tileSize);

        // Redraw grid line
        this.mapContext.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.mapContext.lineWidth = 1;
        this.mapContext.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
}