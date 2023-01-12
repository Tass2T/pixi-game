import { Spritesheet, BaseTexture, TilingSprite } from "pixi.js";
import BackgroundSheetData from "../assets/BackgroundSheetData";
import Player from "./Characters/Player";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.backgroundSpriteSheet = new Spritesheet(
      BaseTexture.from(BackgroundSheetData.meta.image),
      BackgroundSheetData
    );
    this.prepareBackground();
    this.player = new Player(this.scene);
  }

  async prepareBackground() {
    await this.backgroundSpriteSheet.parse();
    const ground = new TilingSprite(
      this.backgroundSpriteSheet.textures.ground,
      760,
      420
    );
    this.scene.addChild(ground);
  }

  update() {}

  dispose() {}
}
