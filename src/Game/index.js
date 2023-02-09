import { TilingSprite } from "pixi.js";
import Player from "./Characters/Player";
import { HEIGHT, WIDTH } from "../utils/constants";
import SpriteManager from "./Various/SpriteManager";
import Villain from "./Characters/Villain";
import VillainManager from "./Characters/VillainManager";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.scene.interactive = true;
    this.spriteManager = new SpriteManager();
    this.prepareBackground();
    this.player = new Player(this.scene);
    this.villainManager = new VillainManager(this.scene);
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
  }

  dispose() {}
}
