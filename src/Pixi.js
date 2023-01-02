import { Application } from "pixi.js";
import Game from "./Game";

export default class Pixi {
  constructor() {
    const gameArea = document.querySelector("#app");
    this.app = new Application({
      autoResize: true,
      resolution: devicePixelRatio,
      backgroundColor: 0x000000,
    });
    this.renderer = this.app.renderer;
    gameArea.appendChild(this.app.view);

    this.setPixiEvents();
    this.initGame();
  }

  setPixiEvents() {
    window.addEventListener("resize", this.resize);
  }

  resize() {
    this.renderer.resize(window.innerWidth, this.inner);
  }

  initGame() {
    this.game = new Game(this.app.stage);
  }

  render() {}

  dispose() {}
}
