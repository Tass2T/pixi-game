import Player from "./Characters/Player";
import {
  BACKGROUND_SPRITE_SIZE,
  BACKGROUND_SPRITE_NUMBER,
  BACKGROUND_SPRITE_KIND_NUMBER,
  MENU,
} from "../utils/constants";
import SpriteManager from "./Managers/SpriteManager";
import VillainManager from "./Characters/VillainManager";
import { CollisionManager } from "./Managers/CollisionManager";
import Pixi from "../App";
import { Sprite } from "pixi.js";
import InputManager from "./Managers/InputManager";

export default class OldGame {
  constructor() {
    this.scene = new Pixi().scene;
    this.scene.interactive = true;
    this.spriteManager = new SpriteManager();
    this.inputManager = new InputManager();
    this.prepareBackground();
    this.player = new Player(this.scene);
    this.villainManager = new VillainManager();
    this.collisionManager = new CollisionManager(
      this.player,
      this.villainManager
    );
    this.state = this.game;
  }

  async prepareBackground() {
    this.backgroundTextures =
      this.spriteManager.getTexture("backgroundTexture");

    let x = 0;
    let y = 0;

    for (let i = 0; i < BACKGROUND_SPRITE_NUMBER; i++) {
      x = 0;
      for (let j = 0; j < BACKGROUND_SPRITE_NUMBER; j++) {
        const sprite = Sprite.from(
          this.backgroundTextures.textures[
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
  }
  update = () => {
    this.state();
  };

  game = () => {
    if (!this.inputManager.keys[MENU.PAUSE]) {
      this.player.update();
      this.villainManager.update();
      this.collisionManager.update();
    }
  };

  dispose() {}
}
