import Pixi from "../../Pixi";
import { VILLAIN_SPAWN_DIRECTION } from "../../utils/constants";
import Player from "./Player";
import Villain from "./Villain";

let instance = null;
export default class VillainManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.scene = new Pixi().scene;
    this.player = new Player();
    this.nbOfVillain = 1;
    this.villains = [
      new Villain(
        this.scene,
        VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)]
      ),
    ];
  }

  update = () => {
    // this.villains.forEach((villain) => {
    //   villain.update();
    // });
  };
}
