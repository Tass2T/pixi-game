import * as PIXI from "pixi.js";
import Game from "./Game";
import { HEIGHT, WIDTH } from "./utils/constants";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class Pixi {
  constructor() {
    const gameArea = document.querySelector("#app");
    this.app = new PIXI.Application({
      autoResize: true,
      width: WIDTH,
      height: HEIGHT,
      resolution: devicePixelRatio,
      backgroundColor: 0x000000,
    });
    // use gsap ticker instead
    this.app.ticker.stop()
    gsap.ticker.add(() => {
      this.app.ticker.update()
    })
    this.scene = this.app.stage;
    gameArea.appendChild(this.app.view);

    this.init();
    let elapsed = 0.0;
    this.app.ticker.maxFPS = 60;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      this.update();
    });
  }

  init() {
    this.game = new Game(this.scene);
  }

  update() {
    this.game.update();
  }

  dispose() {}
}
