import Snake from './Snake';
import Game from './Game';
import Food from './Food';

export default class Board {
  ctx: CanvasRenderingContext2D;
  height: number;
  width: number;
  snake: Snake;
  game: Game;
  food: Food;

  constructor(ctx: CanvasRenderingContext2D, game: Game) {
    this.ctx = ctx;
    this.height = 500;
    this.width = 500;
    this.game = game;
    this.food = new Food(ctx, this);
    this.snake = new Snake(ctx, this, this.game, this.food);
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 5;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeRect(0, 0, this.width, this.height);
    this.snake.draw();
    this.food.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  init() {
    this.snake.init();
  }

  stop() {
    this.snake.stop();

    this.ctx.font = '48px sans-serif';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('You lost', this.width / 2, this.height / 2);
  }
}
