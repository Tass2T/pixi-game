import { Assets, Spritesheet, BaseTexture } from "pixi.js";
import manifest from "../../assets/assetManifest.json";

let instance = null;

export default class SpriteManager {
  constructor() {
    if (instance) return this;

    instance = this;
    this.isLoading = true;
    this.assetLoader = Assets;
    this.initTexture();
  }

  initTexture = () => {};

  getTexture = async (sheetName) => {};
}
