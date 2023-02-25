import * as PIXI from "pixi.js";
import {
  BACKGROUND_SPRITE_KIND_NUMBER,
  BACKGROUND_SPRITE_NUMBER,
  BACKGROUND_SPRITE_SIZE,
  HEIGHT,
  WIDTH,
} from "./utils/constants";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import SpriteManager from "./Game/Managers/SpriteManager";
import { Sprite } from "pixi.js";
import Menu from "./Game/States/Menu";
import Game from "./Game/States/Game";
import GameOver from "./Game/States/GameOver";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export default class App {
  constructor() {
    const gameArea = document.querySelector("#app");
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
    });
    gameArea.appendChild(this.app.view);
    this.scene = this.app.stage;
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
    this.prepareBackground();
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
    this.states[this.state].container.visible = true;
  };

  prepareBackground = () => {
    const backgroundTextures =
      this.spriteManager.getTexture("backgroundTexture");

    let x = 0;
    let y = 0;

    for (let i = 0; i < BACKGROUND_SPRITE_NUMBER; i++) {
      x = 0;
      for (let j = 0; j < BACKGROUND_SPRITE_NUMBER; j++) {
        const sprite = Sprite.from(
          backgroundTextures.textures[
            Math.floor(Math.random() * BACKGROUND_SPRITE_KIND_NUMBER)
          ]
        );
        sprite.x = x;
        sprite.y = y;
        this.scene.addChild(sprite);
        x += BACKGROUND_SPRITE_SIZE;
      }
      y += BACKGROUND_SPRITE_SIZE;
    }
  };

  update() {
    this.states[this.state].update();
  }

  dispose() {}
}
