import { Spritesheet, BaseTexture, Sprite, TilingSprite } from "pixi.js";
import BackgroundSheetData from "../assets/BackgroundSheetData";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.prepareBackground();
  }

  async prepareBackground() {
    this.backgroundSpriteSheet = new Spritesheet(
      BaseTexture.from(BackgroundSheetData.meta.image),
      BackgroundSheetData
    );
    await this.backgroundSpriteSheet.parse();
    const ground = new TilingSprite(
      this.backgroundSpriteSheet.textures.ground,
      800,
      600
    );
    this.scene.addChild(ground);
  }

  update() {}
}
