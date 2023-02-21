import { AnimatedSprite, Rectangle } from "pixi.js";
import { HEIGHT, WIDTH } from "../../utils/constants";
import SpriteManager from "../Various/SpriteManager";
import {
  VILLAIN_SPAWN_DIRECTION,
  ANIMATION_SPEED,
} from "../../utils/constants";
import Character from "./Character";

export default class Villain extends Character {
  constructor(scene, speed) {
    super(scene);
    this.spriteManager = new SpriteManager();
    this.hitbox = new Rectangle();
    this.prepareSprite();
    this.destination = {
      x: 0,
      y: 0,
    };
    this.speed = speed;
  }

  prepareSprite = (newSpeed = null) => {
    if (newSpeed) this.speed = newSpeed;
    const originDirection =
      VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)];
    this.sheet = this.spriteManager.getTexture("villainTexture");
    this.sprite = new AnimatedSprite(
      this.sheet.animations[originDirection.toLowerCase()]
    );
    this.sprite.animationSpeed = ANIMATION_SPEED;
    this.sprite.anchor.set(0.5);
    this.setPosition(originDirection);
    this.setHitbox();
    this.scene.addChild(this.sprite);
    this.sprite.play();
  };

  setPosition = (originDirection) => {
    switch (originDirection) {
      case "DOWN":
        this.sprite.x = Math.floor(Math.random() * WIDTH);
        this.sprite.y = -this.sprite.height;
        break;
      case "UP":
        this.sprite.x = Math.floor(Math.random() * WIDTH);
        this.sprite.y = HEIGHT + this.sprite.height;
        break;
      case "RIGHT":
        this.sprite.x = -this.sprite.width;
        this.sprite.y = Math.floor(Math.random() * HEIGHT);
        break;
      case "LEFT":
        this.sprite.x = WIDTH + this.sprite.width;
        this.sprite.y = Math.floor(Math.random() * HEIGHT);
        break;
    }
  };

  setHitbox = () => {
    const bounds = this.sprite.getBounds();
    this.hitbox.x = bounds.x + 27;
    this.hitbox.y = bounds.y + 12;
    this.hitbox.height = bounds.height - 24;
    this.hitbox.width = bounds.width - 54;
  };

  revive = () => {
    const originDirection =
      VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)];
    this.sprite.textures = this.sheet.animations[originDirection.toLowerCase()];
    this.sprite.loop = true;
    this.sprite.gotoAndPlay(0);
    this.setPosition(originDirection);
    this.isDead = false;
    this.sprite.visible = true;

    this.setHitbox();
  };

  dies() {
    this.isDead = true;
    this.sprite.textures = this.sheet.animations.death;
    this.sprite.animationSpeed = 0.15;
    this.sprite.loop = false;
    this.sprite.play();
    this.sprite.onComplete = () => {
      this.revive();
    };
  }

  update = (x, y) => {
    if (!this.isDead) {
      const vectorX = x - this.sprite.x;
      const vectorY = y - this.sprite.y;
      const distance = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
      this.sprite.x += (vectorX / distance) * this.speed;
      this.sprite.y += (vectorY / distance) * this.speed;
      this.setHitbox();
    }
  };
}
