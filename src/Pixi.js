import { Application } from "pixi.js";

export default class Game {
  constructor() {
    this.init();
  }

  init() {
    const gameArea = document.querySelector("#app");
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
    });
    this.scene = this.app.stage;
    this.renderer = this.app.renderer;
    gameArea.appendChild(this.app.view);
  }

  render() {}

  dispose() {}
}
