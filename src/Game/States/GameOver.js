import { Container, Graphics, Text, TextStyle } from "pixi.js";

export default class GameOver {
  constructor(app, stateFunc) {
    this.app = app;
    this.stateFunc = stateFunc;
    this.container = new Container();
    this.container.visible = false;
    this.drawBackground();
    this.drawMenu();

    this.app.stage.addChild(this.container);
  }

  drawBackground = () => {
    const background = new Graphics();
    background.beginFill(0x000000, 1.0);
    background.drawRect(0, 0, this.app.view.width, this.app.view.height);
    this.container.addChild(background);
  };

  drawMenu = () => {
    const textContainer = new Container();
    textContainer.interactive = true;
    textContainer.x = 300;
    textContainer.y = 200;
    this.container.addChild(textContainer);
    this.container.on("click", () => {
      this.stateFunc("game");
    });

    const text = new Text("Restart");
    text.anchor.set(0.5);
    text.x = textContainer.x;
    text.y = textContainer.y;
    text.style = new TextStyle({
      fill: 0xffffff,
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 25,
    });
    textContainer.addChild(text);
  };

  update = () => {};
}
