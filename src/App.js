import * as PIXI from "pixi.js";
import {
  HEIGHT,
  WIDTH,
} from "./utils/constants";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import SpriteManager from "./Game/Managers/SpriteManager";
import Menu from "./Game/States/Menu";
import Game from "./Game/States/Game";
import GameOver from "./Game/States/GameOver";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export default class App {
  constructor() {
    this.gameArea = document.querySelector("#app");
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      backgroundAlpha: 0.0
    });
    this.gameArea.appendChild(this.app.view);
    this.scene = this.app.stage;
    this.app.stage.interactive = true
    // use gsap ticker instead
    this.app.ticker.stop();
    gsap.ticker.add(() => {
      this.app.ticker.update();
    });
    this.state = "menu";

    // prepare background then init stuff
    this.spriteManager = new SpriteManager();
    this.spriteManager.loadTextures(this.init);
  }

  init = () => {
    this.initStates();
    let elapsed = 0.0;
    this.app.ticker.maxFPS = 60;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      this.update();
    });
  };

  initStates = () => {
    this.states = {
      menu: new Menu(this.app, this.changeState),
      game: new Game(this.app, this.changeState),
      gameOver: new GameOver(this.app, this.changeState),
    };
  };

  changeState = (newState) => {
    this.states[this.state].container.visible = false;
    this.state = newState;
    if (newState === "gameOver") this.states.game.reset();
    this.gameArea.style.backgroundImage=`url(src/assets/background/${newState}.png)`
    this.states[this.state].container.visible = true;
  };

  update() {
    this.states[this.state].update();
  }

  dispose() {}
}
