import * as PIXI from "pixi.js";
import Game from "./Game";
import { HEIGHT, WIDTH } from "./utils/constants";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import SpriteManager from "./Game/Various/SpriteManager";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

let instance = null;

export default class Pixi {
  constructor() {
    if (instance) return instance;
    instance = this;
    const gameArea = document.querySelector("#app");
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: 0x000000,
    });
    this.spriteManager = new SpriteManager();

    // use gsap ticker instead
    this.app.ticker.stop();

    gsap.ticker.add(() => {
      this.app.ticker.update();
    });
    this.scene = this.app.stage;
    this.scene.interactive = true;
    gameArea.appendChild(this.app.view);

    this.init();
    let elapsed = 0.0;
    this.app.ticker.maxFPS = 60;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      this.update();
    });
  }

  init = async () => {
    await this.spriteManager.loadTextures();
    this.game = new Game(this.scene);
  };

  update() {
    if (this.game) this.game.update();
  }

  dispose() {}
}
