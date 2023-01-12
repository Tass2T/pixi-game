import Character from "./Character";
import PlayerSpriteData from "../../assets/PlayerSpriteData.js";
import { AnimatedSprite, Spritesheet, BaseTexture } from "pixi.js";
import {
  DEFAULT_FRAME,
  ANIMATION_SPEED,
  CHARACTER_SPEED,
} from "../../utils/constants.js";

export default class Player extends Character {
  constructor(scene) {
    super(scene);
    this.playerSpriteSheet = new Spritesheet(
      BaseTexture.from(PlayerSpriteData.meta.image),
      PlayerSpriteData
    );
    this.preparePlayer();

    window.addEventListener("keydown", this.manageInput);
    window.addEventListener("keyup", this.manageInput);
  }

  async preparePlayer() {
    await this.playerSpriteSheet.parse();

    this.playerTexture = new AnimatedSprite(
      this.playerSpriteSheet.animations[this.spriteDirection]
    );
    this.playerTexture.animationSpeed = ANIMATION_SPEED;
    this.playerTexture.currentFrame = DEFAULT_FRAME;
    this.playerTexture.anchor.set(0.5);

    this.scene.addChild(this.playerTexture);
  }

  moveTo = (direction) => {
    this.playerTexture.textures = this.playerSpriteSheet.animations[direction];
    this.playerTexture.play();

    // because in the spreadsheet, idle frame for left orientation are in even positions instead of odd
    direction === "left"
      ? (this.playerTexture.currentFrame = 0)
      : (this.playerTexture.currentFrame = DEFAULT_FRAME);

    if (!this.directions.includes(direction)) {
      this.directions.push(direction);
    }
  };

  handleKeyUp = (direction) => {
    if (this.directions.includes(direction)) {
      this.directions.splice(
        this.directions.findIndex((item) => item === direction),
        1
      );
    }
  };

  manageInput = (e) => {
    if (e.repeat) return;
    switch (e.type) {
      case "keydown":
        switch (e.keyCode) {
          case 87:
            this.moveTo("up");
            break;
          case 83:
            this.moveTo("down");
            break;
          case 65:
            this.moveTo("left");
            break;
          case 68:
            this.moveTo("right");
            break;
        }
        break;
      case "keyup":
        switch (e.keyCode) {
          case 87:
            this.handleKeyUp("up");
            break;
          case 83:
            this.handleKeyUp("down");
            break;
          case 65:
            this.handleKeyUp("left");
            break;
          case 68:
            this.handleKeyUp("right");
            break;
        }
        break;
      default:
        break;
    }
  };

  update() {
    if (!this.directions.length) this.playerTexture.stop();
    this.directions.forEach((item) => {
      switch (item) {
        case "down":
          this.playerTexture.y += CHARACTER_SPEED;
          break;
        case "up":
          this.playerTexture.y -= CHARACTER_SPEED;
          break;
        case "left":
          this.playerTexture.x -= CHARACTER_SPEED;
          break;
        case "right":
          this.playerTexture.x += CHARACTER_SPEED;
          break;
        default:
          break;
      }
    });
  }

  dispose() {
    window.removeEventListener("keydown", this.manageInput);
    window.removeEventListener("keyup", this.manageInput);
  }
}
