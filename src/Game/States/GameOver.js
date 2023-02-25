import { Container, Graphics } from "pixi.js";

export default class GameOver {
  constructor(app) {
    this.app = app;
    this.container = new Container();
    this.container.visible = false;
    this.drawBackground();

    this.app.stage.addChild(this.container);
  }

  drawBackground = () => {
    const background = new Graphics();
    background.beginFill(0x000000, 1.0);
    background.drawRect(0, 0, this.app.view.width, this.app.view.height);
    this.container.addChild(background);
  };

  update = () => {};
}
