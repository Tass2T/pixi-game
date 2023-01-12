import Character from "./Character";
import PlayerSpriteData from "../../assets/PlayerSpriteData.js";
import { AnimatedSprite, Spritesheet, BaseTexture } from "pixi.js";

export default class Player extends Character {
  constructor(scene) {
    super(scene);
    this.playerSpriteSheet = new Spritesheet(
      BaseTexture.from(PlayerSpriteData.meta.image),
      PlayerSpriteData
    );
    this.preparePlayer();
  }

  async preparePlayer() {
    await this.playerSpriteSheet.parse();

    this.playerTexture = new AnimatedSprite(
      this.playerSpriteSheet.animations[this.direction]
    );
    this.playerTexture.animationSpeed = 0.08;
    this.playerTexture.play();
    this.scene.addChild(this.playerTexture);
  }

  manageInput() {}
}
