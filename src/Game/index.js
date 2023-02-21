import Player from "./Characters/Player";
import {
  BACKGROUND_SPRITE_SIZE,
  BACKGROUND_SPRITE_NUMBER,
  BACKGROUND_SPRITE_KIND_NUMBER,
} from "../utils/constants";
import SpriteManager from "./Various/SpriteManager";
import VillainManager from "./Characters/VillainManager";
import { CollisionManager } from "./Various/CollisionManager";
import Pixi from "../Pixi";
import { Sprite } from "pixi.js";

export default class Game {
  constructor() {
    this.scene = new Pixi().scene;
    this.scene.interactive = true;
    this.spriteManager = new SpriteManager();
    this.prepareBackground();
    this.player = new Player(this.scene);
    this.villainManager = new VillainManager();
    this.collisionManager = new CollisionManager(
      this.player,
      this.villainManager
    );
    this.state = this.game;
    this.scene.on("click", this.player.shoot);
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
    this.player.update();
    this.villainManager.update();
    this.collisionManager.update();
  };

  dispose() {}
}
