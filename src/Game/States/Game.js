import { Container, Graphics, Rectangle } from "pixi.js";
import { MENU } from "../../utils/constants";
import Player from "../Characters/Player";
import { CollisionManager } from "../Managers/CollisionManager";
import InputManager from "../Managers/InputManager";
import VillainManager from "../Managers/VillainManager";

export default class Game {
  constructor(app, stateFunc) {
    this.app = app;
    this.container = new Container();
    this.app.stage.addChild(this.container);
    this.container.interactive = true;
    this.inputManager = new InputManager();
    this.player = new Player(this.container);
    this.villainManager = new VillainManager(this.container);
    this.collisionManager = new CollisionManager(
      this.player,
      this.villainManager
    );
  }

  update = () => {
    if (!this.inputManager.keys[MENU.PAUSE]) {
      this.player.update();
      this.villainManager.update();
      this.collisionManager.update();
    }
  };
}
