import { Spritesheet, BaseTexture, TilingSprite } from "pixi.js";
import BackgroundSheetData from "../assets/BackgroundSheetData";
import Player from "./Characters/Player";
import { HEIGHT, WIDTH } from "../utils/constants";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.scene.interactive = true;
    this.backgroundSpriteSheet = new Spritesheet(
      BaseTexture.from(BackgroundSheetData.meta.image),
      BackgroundSheetData
    );
    this.prepareBackground();
    this.player = new Player(this.scene);

    window.addEventListener("click", this.player.shoot);
  }

  async prepareBackground() {
    await this.backgroundSpriteSheet.parse();
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
