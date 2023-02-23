import * as PIXI from "pixi.js";
import { HEIGHT, WIDTH } from "./utils/constants";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import SpriteManager from "./Game/Managers/SpriteManager";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export default class App {
  constructor() {
    const gameArea = document.querySelector("#app");
    const scale = window.devicePixelRatio;
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: 0x000000,
      renderer: PIXI.autoDetectRenderer(
        WIDTH * scale,
        HEIGHT * scale,
        gameArea
      ),
    });
    this.spriteManager = new SpriteManager();
    this.scene = this.app.stage;
    gameArea.appendChild(this.app.view);

    // use gsap ticker instead
    this.app.ticker.stop();
    gsap.ticker.add(() => {
      this.app.ticker.update();
    });
    let elapsed = 0.0;
    this.app.ticker.maxFPS = 60;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      this.update();
    });
  }

  update() {}

  dispose() {}
}
