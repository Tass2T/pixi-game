import { AnimatedSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "../../utils/constants";
import SpriteManager from "../Various/SpriteManager";
import Character from "./Character";

export default class Villain extends Character {
  constructor(scene, originDirection) {
    super(scene);
    this.spriteManager = new SpriteManager();
    this.prepareSprite(originDirection);
    this.setPosition(originDirection);
    this.destination = {
      x: 0,
      y: 0,
    };
    this.scene.addChild(this.sprite);
  }

  prepareSprite = (originDirection) => {
    this.sheet = this.spriteManager.getTexture("villainTexture");
    this.sprite = new AnimatedSprite(
      this.sheet.animations[originDirection.toLowerCase()]
    );
    this.sprite.anchor.set(0.5);
  };

  setPosition = (originDirection) => {
    switch (originDirection) {
      case "DOWN":
        this.sprite.x = Math.floor(Math.random() * WIDTH);
        this.sprite.y = 0;
        break;
      case "UP":
        this.sprite.x = Math.floor(Math.random() * WIDTH);
        this.sprite.y = HEIGHT - 85;
        break;
      case "RIGHT":
        this.sprite.x = 0;
        this.sprite.y = Math.floor(Math.random() * HEIGHT);
        break;
      case "LEFT":
        this.sprite.x = WIDTH - 100;
        this.sprite.y = Math.floor(Math.random() * HEIGHT);
        break;
    }
  };

  update = (x, y) => {};
}
