import { Container, Graphics, Text, TextStyle } from "pixi.js";
import {
  VILLAIN_SPEED,
  MAX_NUMBER_OF_VILLAIN,
  WIDTH,
  HEIGHT,
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

    // strech container to the app width and height
    const clickableArea = new Graphics();
    clickableArea.beginFill(0x000000, 0.000001);
    clickableArea.drawRect(0, 0, this.app.view.width, this.app.view.height);
    this.container.addChild(clickableArea);

    this.container.eventMode = "static";
    this.container.sortableChildren = true;
    this.inputManager = new InputManager();
    this.player = new Player(this.container);
    this.pauseScreen = this.preparePauseScreen();
    this.nbOfVillain = 1;
    this.isInPause = false;
    this.villain_speed = VILLAIN_SPEED;
    this.nbOfSlainedVillain = 0;
    this.slainedVillainCounter = this.prepareCounter();
    this.villains = [new Villain(this.container, this.villain_speed)];
    this.container.on("click", (e) => {
      if (this.container.visible) this.player.shoot(e);
    });
    this.inputManager.on("pause", () => {
      this.pauseGame();
    });
  }

  preparePauseScreen = () => {
    const pauseScreen = new Container();
    pauseScreen.x = 0;
    pauseScreen.y = 0;
    pauseScreen.width = WIDTH;
    pauseScreen.height = HEIGHT;
    pauseScreen.visible = false;
    pauseScreen.zIndex = 100000;

    const pauseBackGround = new Graphics();
    pauseBackGround.beginFill(0x000000, 0.5);
    pauseBackGround.drawRect(0, 0, WIDTH, HEIGHT);

    const pauseLogo = new Text("PAUSE");
    pauseLogo.anchor.set(0.5);
    pauseLogo.x = 600;
    pauseLogo.y = 300;
    pauseLogo.style = new TextStyle({
      fill: 0xffffff,
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 120,
    });
    const pauseComment = new Text("Press ESC to go back fighting!");
    pauseComment.anchor.set(0.5);
    pauseComment.x = 600;
    pauseComment.y = 450;
    pauseComment.style = new TextStyle({
      fill: 0xffffff,
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 20,
    });
    pauseScreen.addChild(pauseBackGround, pauseLogo, pauseComment);

    this.container.addChild(pauseScreen);
    return pauseScreen;
  };

  prepareCounter = () => {
    const counterContainer = new Container();
    counterContainer.x = 100;
    counterContainer.y = HEIGHT - 60;
    counterContainer.zIndex = 99999;

    const counter = new Text(this.nbOfSlainedVillain);
    counter.anchor.set(0);
    counter.style = new TextStyle({
      fill: 0xffffff,
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 30,
    });

    counterContainer.addChild(counter);

    this.container.addChild(counterContainer);
    return counterContainer;
  };

  updateSlainedCounter = () => {
    this.slainedVillainCounter.children[0].text = this.nbOfSlainedVillain;
  };

  reset = () => {
    this.player.reset();
    this.nbOfVillain = 1;
    this.villain_speed = VILLAIN_SPEED;
    this.villains.forEach((villain) => {
      villain.dispose();
    });
    this.nbOfSlainedVillain = 0;
    this.updateSlainedCounter();
    this.villains = [new Villain(this.container, this.villain_speed)];
  };

  update = () => {
    if (!this.isInPause) {
      this.player.update();
      this.villains.forEach((villain) => {
        villain.update(this.player.sprite.x, this.player.sprite.y);
      });
      this.checkImpacts();
    }
  };

  pauseGame = () => {
    this.isInPause = !this.isInPause;
    this.player.pause(this.isInPause);
    this.villains.forEach((villain) => {
      villain.pause(this.isInPause);
    });
    this.pauseScreen.visible = false;
    if (this.isInPause) this.pauseScreen.visible = true;
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
            this.nbOfSlainedVillain += 1;
            this.updateSlainedCounter();
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
