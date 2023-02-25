import { Container } from "pixi.js";
import {
  MENU,
  VILLAIN_SPEED,
  MAX_NUMBER_OF_VILLAIN,
} from "../../utils/constants";
import Player from "../Characters/Player";
import Villain from "../Characters/Villain";
import InputManager from "../Managers/InputManager";

export default class Game {
  constructor(app, stateFunc) {
    this.app = app;
    this.stateFunc = stateFunc;
    this.container = new Container();
    this.container.visible = false;
    this.app.stage.addChild(this.container);
    this.container.interactive = true;
    this.inputManager = new InputManager();
    this.player = new Player(this.container);
    this.nbOfVillain = 1;
    this.villain_speed = VILLAIN_SPEED;
    this.villains = [new Villain(this.container, this.villain_speed)];
    this.app.stage.on("click", (e) => {
      if (this.container.visible) this.player.shoot(e);
    });
  }

  reset = () => {
    this.player.reset();
    this.nbOfVillain = 1;
    this.villain_speed = VILLAIN_SPEED;
    this.villains.forEach((villain) => {
      villain.dispose();
    });
    this.villains = [new Villain(this.container, this.villain_speed)];
  };

  update = () => {
    if (!this.inputManager.keys[MENU.PAUSE]) {
      this.player.update();
      this.villains.forEach((villain) => {
        villain.update(this.player.sprite.x, this.player.sprite.y);
      });
      this.checkImpacts();
    }
  };

  addVilain = () => {
    if (this.villains.length <= MAX_NUMBER_OF_VILLAIN)
      this.villains.push(new Villain(this.container, this.villain_speed));
  };

  checkImpacts = () => {
    this.villains
      .filter((villain) => !villain.isDead)
      .forEach((villain) => {
        if (this.hitTestRectangle(villain.hitbox, this.player.hitbox)) {
          this.player.isDead = true;
          this.stateFunc("gameOver");
        }

        this.player.bullets.forEach((bullet) => {
          if (this.hitTestRectangle(villain.hitbox, bullet.hitbox)) {
            bullet.dispose();
            villain.dies();
            this.addVilain();
            this.villain_speed += 0.01;
          }
        });
      });
  };

  hitTestRectangle(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
  }
}
