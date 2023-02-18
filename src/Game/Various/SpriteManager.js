import { Assets, Sprite } from "pixi.js";

let instance = null;

export default class SpriteManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.loader = Assets;
    this.isLoading = true;
    this.addTextures();
  }

  addTextures = () => {
    this.loader.add("player", "/src/assets/player/playerSpriteSheetData.json");
    this.loader.add(
      "background",
      "/src/assets/background/backgroundSpriteSheetData.json"
    );
    this.loader.add(
      "explosion",
      "/src/assets/bullets/explosionSpriteSheetData.json"
    );
    this.loader.add("bullet", "/src/assets/bullets/stake.png");
    this.loader.add("villain", "/src/assets/villain/villainSpriteSheet.json");
  };

  loadTextures = async () => {
    const texturePromise = await this.loader.load([
      "player",
      "background",
      "explosion",
      "bullet",
      "villain",
    ]);

    this.playerTexture = texturePromise.player;
    this.backgroundTexture = texturePromise.background;
    this.explosionTexture = texturePromise.explosion;
    this.bulletTexture = texturePromise.bullet;
    this.villainTexture = texturePromise.villain;
    this.isLoading = false;
  };

  getTexture = (name) => {
    return this[name];
  };
}
