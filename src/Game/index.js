import {
  Spritesheet,
  BaseTexture,
  TilingSprite,
  AnimatedSprite,
} from "pixi.js";
import BackgroundSheetData from "../assets/BackgroundSheetData";
import PlayerSpriteData from "../assets/PlayerSpriteData";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.prepareBackground();
    this.prepareCharacter();
  }

  async prepareBackground() {
    this.backgroundSpriteSheet = new Spritesheet(
      BaseTexture.from(BackgroundSheetData.meta.image),
      BackgroundSheetData
    );
    await this.backgroundSpriteSheet.parse();
    const ground = new TilingSprite(
      this.backgroundSpriteSheet.textures.ground,
      760,
      420
    );
    this.scene.addChild(ground);
  }

  async prepareCharacter() {
    this.playerSpriteSheet = new Spritesheet(
      BaseTexture.from(PlayerSpriteData.meta.image),
      PlayerSpriteData
    );
    await this.playerSpriteSheet.parse();

    this.playerTexture = new AnimatedSprite(
      this.playerSpriteSheet.animations.up
    );

    this.playerTexture.animationSpeed = 0.08;
    this.playerTexture.play();

    this.scene.addChild(this.playerTexture);
  }

  update() {}
}
