import Board from './Board';

export default class SnakeBodyPart {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  next: SnakeBodyPart | null;
  board: Board;
  width: number;
  height: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    board: Board,
    next: SnakeBodyPart | null,
    x?: number,
    y?: number,
    height: number = 10,
    width: number = 10
  ) {
    this.ctx = ctx;
    this.board = board;
    if (x && y) {
      this.x = x;
      this.y = y;
    } else {
      const [x, y] = this.initCoords();
      this.x = x;
      this.y = y;
    }
    this.next = next;

    this.height = height;
    this.width = width;
  }

  draw() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.x, this.y, 10, 10);
  }

  private initCoords() {
    return [
      Math.random() * (this.board.width - 250) + 100,
      Math.random() * (this.board.height - 250) + 100,
    ];
  }
}
