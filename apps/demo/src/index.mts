import { Game } from '@symbolic-dreams/bloodline';
import defaultMap from './game/maps/default.json'
import defaultTilSet from './game/tilesets/default-32.png'
import transitionTestMap from './game/maps/transition-test.json'
import transitionTestTileSet from './game/tilesets/transition-test-48.png'

const { min, max } = Math,
    clamp = (value: number, low: number, high: number) => min(max(value, low), high);

class DemoGame extends Game {
    override tileSets = new Map([
        ['default', { size: 32, url: defaultTilSet }],
        ['transition-test', { size: 48, url: transitionTestTileSet }]
    ])

    override tileMaps = new Map([
        ['default', { json: defaultMap }],
        ['transition-test', { json: transitionTestMap }]
    ])

    override onKeyDown(e: KeyboardEvent) {
        const { camera, elCanvas: { width: cw, height: ch }, map } = this,
            { x: cx, y: cy } = camera.position,
            { tileSize } = map!.tileSet,
            delta = 5,
            minLeft = 0,
            minTop = 0,
            maxLeft = max(0, map!.width * tileSize - cw),
            maxTop = max(0, map!.height * tileSize - ch);

        self.console.log(`cx: ${cx}, cy: ${cy}`)

        switch (e.key) {
            case 'ArrowUp':
                self.console.log(`ArrowUp: cx: ${cx}, cy: ${clamp(cy - delta, minTop, maxTop)}`)
                camera.moveTo(cx, clamp(cy - delta, minTop, maxTop));
                break;
            case 'ArrowDown':
                self.console.log(`ArrowDown: cx: ${cx}, cy: ${clamp(cy + delta, minTop, maxTop)}`)
                camera.moveTo(cx, clamp(cy + delta, minTop, maxTop));
                break;
            case 'ArrowLeft':
                self.console.log(`ArrowLeft: ${clamp(cx - delta, minLeft, maxLeft)}`)
                camera.moveTo(clamp(cx - delta, minLeft, maxLeft), cy);
                break;
            case 'ArrowRight':
                self.console.log(`ArrowRight: ${clamp(cx + delta, minLeft, maxLeft)}`)
                camera.moveTo(clamp(cx + delta, minLeft, maxLeft), cy);
                break;
        }
    }
}

const game = new DemoGame();
//game.loadMap('default').then(() => {
game.loadMap('transition-test').then(() => {
    game.start();
})