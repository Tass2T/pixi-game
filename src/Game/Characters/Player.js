import Character from "./Character";
import { AnimatedSprite } from "pixi.js";
import {
  DEFAULT_FRAME,
  ANIMATION_SPEED,
  CHARACTER_SPEED,
  CONTROLS,
  HEIGHT,
  WIDTH,
} from "../../utils/constants.js";
import { Bullet } from "../Items/Bullets";
import SpriteManager from "../Managers/SpriteManager.js";
import InputManager from "../Managers/InputManager";

let instance = null;

export default class Player extends Character {
  constructor(parentContainer) {
    if (instance) return instance;
    super(parentContainer);
    instance = this;
    this.spriteManager = new SpriteManager();
    this.inputManager = new InputManager();
    this.preparePlayer();
    this.bullets = [];
    this.container.on("click", this.shoot);
  }

  async preparePlayer() {
    this.playerSpriteSheet = this.spriteManager.getTexture("playerTexture");
    this.sprite = new AnimatedSprite(
      this.playerSpriteSheet.animations[this.spriteDirection]
    );

    this.sprite.animationSpeed = ANIMATION_SPEED;
    this.sprite.currentFrame = DEFAULT_FRAME;
    this.sprite.anchor.set(0.5);
    this.sprite.x = WIDTH / 2 - this.sprite.width / 2;
    this.sprite.y = HEIGHT / 2 - this.sprite.height / 2;

    this.container.addChild(this.sprite);
  }

  updateSprite = () => {
    for (const [key, value] of Object.entries(CONTROLS)) {
      if (this.inputManager.keys[value]) {
        this.sprite.textures =
          this.playerSpriteSheet.animations[key.toLowerCase()];
        this.sprite.play();
        return;
      }

      this.sprite.stop();
    }
  };

  shoot = (e) => {
    const pos = e.data.global;
    const origin = { x: this.sprite.x, y: this.sprite.y };
    const destination = { x: pos.x, y: pos.y };
    this.bullets.push(
      new Bullet(origin, destination, this.container, this.explosionTexture)
    );
  };

  update() {
    this.updateSprite();
    if (this.inputManager.keys[CONTROLS.DOWN] && this.sprite.y <= HEIGHT - 52)
      this.sprite.y += CHARACTER_SPEED;
    if (this.inputManager.keys[CONTROLS.UP] && this.sprite.y >= 0)
      this.sprite.y -= CHARACTER_SPEED;
    if (this.inputManager.keys[CONTROLS.LEFT] && this.sprite.x >= 0)
      this.sprite.x -= CHARACTER_SPEED;
    if (this.inputManager.keys[CONTROLS.RIGHT] && this.sprite.x <= WIDTH - 45)
      this.sprite.x += CHARACTER_SPEED;

    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }

  dispose() {}
}
