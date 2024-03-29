import { AnimatedSprite, Rectangle } from "pixi.js";
import { HEIGHT, WIDTH } from "../../utils/constants";
import SpriteManager from "../Managers/SpriteManager";
import {
  VILLAIN_SPAWN_DIRECTION,
  ANIMATION_SPEED,
} from "../../utils/constants";
import Character from "./Character";

export default class Villain extends Character {
  constructor(container, speed) {
    super(container);
    this.spriteManager = new SpriteManager();
    this.hitbox = new Rectangle();
    this.prepareSprite();
    this.speed = speed;
  }

  prepareSprite = (newSpeed = null) => {
    if (newSpeed) this.speed = newSpeed;
    this.direction = VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)];
    this.sheet = this.spriteManager.getTexture("villainTexture");
    this.sprite = new AnimatedSprite(
      this.sheet.animations[this.direction.toLowerCase()]
    );
    this.sprite.animationSpeed = ANIMATION_SPEED;
    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = this.sprite.y;
    this.setPosition(this.direction);
    this.setHitbox();
    this.container.addChild(this.sprite);
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
    this.speed += 0.01;
    this.sprite.gotoAndPlay(0);
    this.setPosition(originDirection);
    this.isDead = false;
    this.sprite.visible = true;

    this.setHitbox();
  };

  manageDirection = (vectorX, vectorY) => {
    if (vectorY <= 50 && vectorY >= -50) {
      if (vectorX < 0 && this.direction !== "LEFT") {
        this.direction = "LEFT";
        this.sprite.textures = this.sheet.animations["left"];
        this.sprite.play();
      }
      if (vectorX > 0 && this.direction !== "RIGHT") {
        this.direction = "RIGHT";
        this.sprite.textures = this.sheet.animations["right"];
        this.sprite.play();
      }
    } else {
      if (vectorY < 0 && this.direction !== "UP") {
        this.direction = "UP";
        this.sprite.textures = this.sheet.animations["up"];
        this.sprite.play();
      }

      if (vectorY > 0 && this.direction !== "DOWN") {
        this.direction = "DOWN";
        this.sprite.textures = this.sheet.animations["down"];
        this.sprite.play();
      }
    }
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

  dispose = () => {
    this.sprite.destroy();
  };

  update = (x, y) => {
    if (!this.isDead) {
      const vectorX = x - this.sprite.x;
      const vectorY = y - this.sprite.y;
      const distance = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
      this.manageDirection(vectorX, vectorY);
      this.sprite.x += (vectorX / distance) * this.speed;
      this.sprite.y += (vectorY / distance) * this.speed;
      this.sprite.zIndex = this.sprite.y;
      this.setHitbox();
    }
  };
}
