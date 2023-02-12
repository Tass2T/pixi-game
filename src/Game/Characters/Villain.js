import { AnimatedSprite, Graphics, Rectangle } from "pixi.js";
import { HEIGHT, WIDTH } from "../../utils/constants";
import SpriteManager from "../Various/SpriteManager";
import { VILLAIN_SPAWN_DIRECTION } from "../../utils/constants";
import Character from "./Character";

export default class Villain extends Character {
  constructor(scene) {
    super(scene);
    this.spriteManager = new SpriteManager();
    this.hitbox = new Rectangle()
    this.prepareSprite();
    this.destination = {
      x: 0,
      y: 0,
    };
  }

  prepareSprite = () => {
    
    const originDirection = VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)]
    this.sheet = this.spriteManager.getTexture("villainTexture");
    this.sprite = new AnimatedSprite(
      this.sheet.animations[originDirection.toLowerCase()]
    );
    this.sprite.anchor.set(0.5);
    this.setPosition(originDirection);
    this.setHitbox()    
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

  setHitbox() {
    const bounds = this.sprite.getBounds()
    this.hitbox.x = bounds.x + 20
    this.hitbox.y = bounds.y
    this.hitbox.height = bounds.height
    this.hitbox.width = bounds.width /2
  }

  revive() {
    const originDirection = VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)]
    this.setPosition(originDirection);
    this.setHitbox()
    this.isDead = false
    this.sprite.visible = true
  }

  dies() {
    this.isDead = true;
    this.sprite.visible = false;
  }

  update = (x, y) => {};
}
