import Game from './Game';

export default class Starter {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  start() {
    this.game.start();
  }
}
