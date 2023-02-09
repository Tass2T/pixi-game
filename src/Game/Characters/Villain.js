import { AnimatedSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "../../utils/constants";
import SpriteManager from "../Various/SpriteManager";
import Character from "./Character";

export default class Villain extends Character {
  constructor(scene, originDirection) {
    super(scene);
    this.spriteManager = new SpriteManager();
    this.prepareSprite(originDirection);
    this.destination = {
      x: 0,
      y: 0,
    };
  }

  prepareSprite = (originDirection) => {
    this.sheet = this.spriteManager.getTexture("villainTexture");
    this.sprite = new AnimatedSprite(
      this.sheet.animations[originDirection.toLowerCase()]
    );
    this.sprite.anchor.set(0.5);
    this.setPosition(originDirection);
    this.scene.addChild(this.sprite);
  };

  setPosition = (originDirection) => {
    switch (originDirection) {
      case "DOWN":
        this.sprite.x = Math.floor(Math.random() * WIDTH);
        this.sprite.y = 40;
        break;
      case "UP":
        this.sprite.x = Math.floor(Math.random() * WIDTH);
        this.sprite.y = HEIGHT - 40;
        break;
      case "RIGHT":
        this.sprite.x = 40;
        this.sprite.y = Math.floor(Math.random() * HEIGHT);
        break;
      case "LEFT":
        this.sprite.x = WIDTH - 40;
        this.sprite.y = Math.floor(Math.random() * HEIGHT);
        break;
    }
  };

  update = (x, y) => {};
}
