import { Sprite } from "pixi.js";
import Player from "./Characters/Player";
import { BACKGROUND_SPRITE_SIZE, BACKGROUND_SPRITE_NUMBER } from "../utils/constants";
import SpriteManager from "./Various/SpriteManager";
import VillainManager from "./Characters/VillainManager";
import { CollisionManager } from "./Various/CollisionManager";
import Pixi from "../Pixi";

const level = [
  [Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER)],
  [Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER)],
  [Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER)],
  [Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER)],
  [Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER),Math.floor(Math.random() * BACKGROUND_SPRITE_NUMBER)]
]

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
    this.backgroundTextures =
      this.spriteManager.getTexture("backgroundTexture");
      
    let x = 0  
    let y = 0

    level.forEach(line => {
      x = 0
      line.forEach(element => {
        const sprite = Sprite.from(this.backgroundTextures.textures[element])
        sprite.x = x
        sprite.y = y
        this.scene.addChild(sprite)
        x+= BACKGROUND_SPRITE_SIZE
      })
      y += BACKGROUND_SPRITE_SIZE
    });

  }
  update() {
    this.player.update();
    this.villainManager.update();
    this.collisionManager.update()
  }

  dispose() {}
}
