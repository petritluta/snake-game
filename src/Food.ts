import Board from './Board';

export default class Food {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  board: Board;
  value = 5;

  constructor(ctx: CanvasRenderingContext2D, board: Board) {
    this.ctx = ctx;
    this.board = board;
    const [x, y] = this.initCoords();

    this.x = x;
    this.y = y;
  }

  changePosition() {
    const [x, y] = this.initCoords();
    this.x = x;
    this.y = y;
  }

  private initCoords() {
    return [
      Math.random() * (this.board.width - 250) + 100,
      Math.random() * (this.board.height - 250) + 100,
    ];
  }

  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, 5, 5);
  }
}
