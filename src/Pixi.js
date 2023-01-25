import { Application } from "pixi.js";
import Game from "./Game";
import { HEIGHT, WIDTH } from "./utils/constants";

export default class Pixi {
  constructor() {
    const gameArea = document.querySelector("#app");
    this.app = new Application({
      autoResize: true,
      width: WIDTH,
      height: HEIGHT,
      resolution: devicePixelRatio,
      backgroundColor: 0x000000,
    });
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
