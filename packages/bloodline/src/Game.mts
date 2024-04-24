import { Presenter } from './Presenter.mjs';
import { TileMap } from './TileMap/TileMap.mjs';
import { TileMapJson, TileMapRepository } from './TileMap/TileMapRepository.mjs';
import { Camera } from './index.mjs';

export abstract class Game extends Presenter<TileMap> {
    #elCanvas = document.createElement('canvas');
    #ctx = this.#elCanvas.getContext('2d', { alpha: false })!;
    #map?: TileMap;
    #camera: Camera = new Camera({ x: 0, y: 0 });

    isRunning = false;
    abstract readonly tileSets: Map<string, { size: number; url: string }>;
    abstract readonly tileMaps: Map<string, { json: TileMapJson }>;

    constructor() {
        super(document.body);

        this.#initStyle();
        this.#initEvents();

        this.onResize(new UIEvent('resize'));

        document.body.appendChild(this.#elCanvas);
    }

    #initEvents() {
        document.addEventListener('keydown', e => { this.onKeyDown(e); });
        window.addEventListener('resize', e => { this.onResize(e); });
    }

    #initStyle() {
        Object.assign(document.body.style, {
            boxSizing: 'border-box',
            backgroundColor: 'black',
            margin: '0',
            height: '100vh',
            width: '100vw',
            display: 'grid',
            overflow: 'hidden'
        });

        this.#elCanvas.style.placeSelf = 'center';
    }

    get camera() { return this.#camera; }

    get elCanvas() { return this.#elCanvas; }

    get map() { return this.#map; }

    clear() {
        this.#ctx.clearRect(0, 0, this.#elCanvas.width, this.#elCanvas.height);
    }

    async loadMap(id: string): Promise<void> {
        const repository = new TileMapRepository(this.tileMaps, this.tileSets);
        this.#map = await repository.get(id);
    }

    onKeyDown(e: KeyboardEvent) { void e; }

    onResize(_: UIEvent) {
        const [height, width] = [innerHeight, innerWidth];
        this.#ctx.save();
        Object.assign(this.#elCanvas, { width, height });
        this.#ctx.restore();
    }

    start() {
        if (!this.#map)
            throw new Error('No map loaded');
        this.isRunning = true;
        this.update();
    }

    update() {
        if (!this.isRunning)
            return;

        requestAnimationFrame(() => this.update());

        this.present(this.#map!);
    }

    present(tileMap: TileMap) {
        const ctx = this.#ctx,
            { cells } = tileMap,
            tileSize = tileMap.tileSet.tileSize,
            { position: [cx, cy] } = this.#camera!,
            [cw, ch] = [this.#elCanvas.width, this.#elCanvas.height];

        this.clear();

        cells.forEach((row, y) => {
            const isRowInView = y * tileSize + tileSize > cy && y * tileSize < cy + ch;
            if (!isRowInView) return;

            row.forEach((cell, x) => {
                const isCellInView = x * tileSize + tileSize > cx && x * tileSize < cx + cw;
                if (!isCellInView) return;

                for (let i = 0; i < cell.length; i++) {
                    const tile = cell.tiles[i];
                    ctx.drawImage(
                        tile.tileSetImage,
                        tile.sourceRect.x,
                        tile.sourceRect.y,
                        tileSize,
                        tileSize,
                        x * tileSize - cx,
                        y * tileSize - cy,
                        tileSize,
                        tileSize
                    );
                }
            });
        });
    }
}