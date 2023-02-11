import { TilingSprite } from "pixi.js";
import Player from "./Characters/Player";
import { HEIGHT, WIDTH } from "../utils/constants";
import SpriteManager from "./Various/SpriteManager";
import VillainManager from "./Characters/VillainManager";
import { CollisionManager } from "./Various/CollisionManager";
import Pixi from "../Pixi";

export default class Game {
  constructor() {
    this.scene = new Pixi().scene;
    this.scene.interactive = true;
    this.spriteManager = new SpriteManager();
    this.prepareBackground();
    this.player = new Player(this.scene);
    this.villainManager = new VillainManager();
    this.collisionManager = new CollisionManager(this.player, this.villainManager)
    this.scene.on("click", this.player.shoot);
  }

  async prepareBackground() {
    this.backgroundSpriteSheet =
      this.spriteManager.getTexture("backgroundTexture");

    const ground = new TilingSprite(
      this.backgroundSpriteSheet.textures.ground,
      WIDTH,
      HEIGHT
    );
    this.scene.addChild(ground);
  }
  update() {
    this.player.update();
    this.villainManager.update();
    this.collisionManager.update()
  }

  dispose() {}
}
