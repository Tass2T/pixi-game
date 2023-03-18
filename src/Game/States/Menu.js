import { Container, Graphics, Text, TextStyle } from "pixi.js";

export default class Menu {
  constructor(app, stateFunc) {
    this.app = app;
    this.container = new Container();
    this.app.stage.addChild(this.container);
    this.drawRect();
    this.drawTexts();
    this.setEvents(stateFunc);
  }

  drawRect = () => {
    const rect = new Graphics();
    rect.beginFill(0x00000, 0.5);
    rect.drawRect(0, 0, this.app.view.width, this.app.view.height);
    this.container.addChild(rect);
  };

  drawTexts = () => {
    const title = new Text("Chuffy, Vampire Slayer");
    title.anchor.set(0.5);
    title.x = this.app.view.width / 2;
    title.y = 150;
    title.style = new TextStyle({
      fill: 0xffffff,
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 55,
    });

    this.optionContainer = new Container();
    this.optionContainer.eventMode = "static";
    this.optionContainer.x = 300;
    this.optionContainer.y = 200;

    const newGame = new Text("New game");
    newGame.anchor.set(0.5);
    newGame.x = this.optionContainer.x;
    newGame.y = this.optionContainer.y;
    newGame.style = new TextStyle({
      fill: 0xffffff,
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 25,
    });
    this.optionContainer.addChild(newGame);

    this.container.addChild(title, this.optionContainer);
  };

  setEvents = (stateFunc) => {
    this.optionContainer.on("click", () => {
      stateFunc("game");
    });
  };

  update = () => {};
}
