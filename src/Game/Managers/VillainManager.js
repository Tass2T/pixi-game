import { MAX_NUMBER_OF_VILLAIN, VILLAIN_SPEED } from "../../utils/constants";

import Player from "../Characters/Player";
import Villain from "../Characters/Villain";

let instance = null;
export default class VillainManager {
  constructor(gameContainer) {
    if (instance) return instance;
    instance = this;
    this.container = gameContainer;
    this.player = new Player();
    this.nbOfVillain = 1;
    this.villain_speed = VILLAIN_SPEED;
    this.villains = [new Villain(this.container, this.villain_speed)];
  }

  addVilain = () => {
    if (this.villains.length <= MAX_NUMBER_OF_VILLAIN)
      this.villains.push(new Villain(this.container, this.villain_speed));
  };

  reset = () => {
    this.nbOfVillain = 1;
    this.villain_speed = VILLAIN_SPEED;
    this.villains.forEach((villain) => {
      villain.dispose();
    });
    this.villains = [new Villain(this.container, this.villain_speed)];
  };

  update = () => {
    this.villains.forEach((villain) => {
      villain.update(this.player.sprite.x, this.player.sprite.y);
    });
  };
}
