import { Assets, Spritesheet, BaseTexture } from "pixi.js";

let instance = null;

export default class SpriteManager {
  constructor() {
    if (instance) return this;
    instance = this;
    this.loader = Assets;
    this.isLoading = true;
    this.initTexture();
  }

  initTexture = async () => {
    this.loader.add("player", "/src/assets/player/playerSpriteSheetData.json");
    this.loader.add(
      "background",
      "/src/assets/background/backgroundSpriteSheetData.json"
    );
    this.loader.add(
      "explosion",
      "/src/assets/bullets/explosionSpriteSheetData.json"
    );
    const texturePromise = this.loader.load([
      "player",
      "background",
      "explosion",
    ]);

    texturePromise.then((resolvedTexture) => {
      this.playerTexture = resolvedTexture.player;
      this.backgroundTexture = resolvedTexture.background;
      this.explosionTexture = resolvedTexture.explosion;
      this.isLoading = false;
    });
  };

  getTexture = (name) => {
    return this[name];
  };
}
