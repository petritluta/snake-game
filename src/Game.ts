import Board from './Board';

export default class Game {
  board: Board;

  score: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.board = new Board(ctx, this);
    this.score = 0;
    this.init();
  }

  init() {
    this.board.init();
  }

  changeScore(value: number) {
    this.score += value;
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = this.score.toString();
  }

  start() {
    this.board.draw();
  }

  stop() {
    this.board.stop();
  }
}
