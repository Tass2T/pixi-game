import { VILLAIN_SPAWN_DIRECTION } from "../../utils/constants";
import Player from "./Player";
import Villain from "./Villain";

export default class VillainManager {
  constructor(scene) {
    this.scene = scene;
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
    this.villains.forEach((villain) => {
      villain.update();
    });
  };
}
