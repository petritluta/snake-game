import Direction from './types/Direction';
import Board from './Board';
import Game from './Game';
import Food from './Food';
import SnakeBodyPart from './SnakeBodyPart';

export default class Snake {
  ctx: CanvasRenderingContext2D;
  board: Board;
  currentDirection: Direction;
  food: Food;
  game: Game;
  head: SnakeBodyPart;

  interval: NodeJS.Timer | undefined;

  constructor(
    ctx: CanvasRenderingContext2D,
    board: Board,
    game: Game,
    food: Food
  ) {
    this.ctx = ctx;
    this.game = game;
    this.board = board;
    this.food = food;

    this.currentDirection = Direction.UP;

    this.head = new SnakeBodyPart(this.ctx, this.board, null);
  }

  draw() {
    let node: SnakeBodyPart | null = this.head;
    do {
      node.draw();
      node = node.next;
    } while (node != null);
  }

  checkIfAteFood() {
    return (
      Math.abs(this.head.x - this.food.x) <= 10 &&
      Math.abs(this.head.y - this.food.y) <= 10
    );
  }

  checkIfGameIsLost() {
    return (
      this.head.x < 0 ||
      this.head.x > this.board.width ||
      this.head.y < 0 ||
      this.head.y > this.board.height ||
      this.hasTouchHisBody()
    );
  }

  hasTouchHisBody() {
    let node = this.head.next;

    while (node != null) {
      if (
        Math.abs(this.head.x - node.x) < 5 &&
        Math.abs(this.head.y - node.y) < 5
      )
        return true;

      node = node.next;
    }

    return false;
  }

  addBodyPart() {
    let node = this.head;

    while (node.next != null) {
      node = node.next;
    }

    let x = 0,
      y = 0;

    switch (this.currentDirection) {
      case Direction.UP:
        y = 10;
        break;

      case Direction.LEFT:
        x = 10;
        break;
      case Direction.DOWN:
        y -= 10;
        break;
      case Direction.RIGHT:
        x = -10;
        break;
    }

    node.next = new SnakeBodyPart(
      this.ctx,
      this.board,
      null,
      node.x + x,
      node.y + y
    );
  }

  moveBody(x: number, y: number) {
    let prevX = this.head.x;
    let prevY = this.head.y;
    this.head.x += x;
    this.head.y += y;
    let node = this.head;

    while (node.next != null) {
      let x = 0,
        y = 0;

      let tempPrevX = prevX;
      let tempPrevY = prevY;
      prevX = node.next.x;
      prevY = node.next.y;
      node.next.x = tempPrevX + x;
      node.next.y = tempPrevY + y;
      node = node.next;
    }
  }

  move() {
    this.interval = setInterval(() => {
      switch (this.currentDirection) {
        case Direction.UP:
          this.moveBody(0, -10);
          break;
        case Direction.DOWN:
          this.moveBody(0, 10);
          break;
        case Direction.RIGHT:
          this.moveBody(10, 0);
          break;
        case Direction.LEFT:
          this.moveBody(-10, 0);
          break;
      }

      this.board.clear();
      this.board.draw();

      if (this.checkIfAteFood()) {
        this.food.changePosition();
        this.addBodyPart();
        this.game.changeScore(this.food.value);
      }

      if (this.checkIfGameIsLost()) {
        this.game.stop();
      }
    }, 150);
  }

  changeDir = (key: string) => {
    let newDirection;
    switch (key) {
      case 'w':
        newDirection = Direction.UP;
        break;
      case 's':
        newDirection = Direction.DOWN;
        break;
      case 'a':
        newDirection = Direction.LEFT;
        break;
      case 'd':
        newDirection = Direction.RIGHT;
        break;
    }

    if (
      (this.currentDirection == Direction.UP &&
        newDirection == Direction.DOWN) ||
      (this.currentDirection == Direction.DOWN &&
        newDirection == Direction.UP) ||
      (this.currentDirection == Direction.RIGHT &&
        newDirection == Direction.LEFT) ||
      (this.currentDirection == Direction.LEFT &&
        newDirection == Direction.RIGHT)
    )
      return;

    if (newDirection) this.currentDirection = newDirection;
  };

  listen() {
    document.addEventListener('keydown', (event) => {
      this.changeDir(event.key);
    });
  }

  init() {
    this.listen();
    this.move();
  }

  stop() {
    this.board.clear();
    clearInterval(this.interval);
  }
}
