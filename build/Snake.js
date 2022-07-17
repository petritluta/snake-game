"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __importDefault(require("./types/Direction"));
const SnakeBodyPart_1 = __importDefault(require("./SnakeBodyPart"));
class Snake {
    constructor(ctx, board, game, food) {
        this.changeDir = (key) => {
            let newDirection;
            switch (key) {
                case 'w':
                    newDirection = Direction_1.default.UP;
                    break;
                case 's':
                    newDirection = Direction_1.default.DOWN;
                    break;
                case 'a':
                    newDirection = Direction_1.default.LEFT;
                    break;
                case 'd':
                    newDirection = Direction_1.default.RIGHT;
                    break;
            }
            if ((this.currentDirection == Direction_1.default.UP &&
                newDirection == Direction_1.default.DOWN) ||
                (this.currentDirection == Direction_1.default.DOWN &&
                    newDirection == Direction_1.default.UP) ||
                (this.currentDirection == Direction_1.default.RIGHT &&
                    newDirection == Direction_1.default.LEFT) ||
                (this.currentDirection == Direction_1.default.LEFT &&
                    newDirection == Direction_1.default.RIGHT))
                return;
            if (newDirection)
                this.currentDirection = newDirection;
        };
        this.ctx = ctx;
        this.game = game;
        this.board = board;
        this.food = food;
        this.currentDirection = Direction_1.default.UP;
        this.head = new SnakeBodyPart_1.default(this.ctx, this.board, null);
    }
    draw() {
        let node = this.head;
        do {
            node.draw();
            node = node.next;
        } while (node != null);
    }
    checkIfAteFood() {
        return (Math.abs(this.head.x - this.food.x) <= 10 &&
            Math.abs(this.head.y - this.food.y) <= 10);
    }
    checkIfGameIsLost() {
        return (this.head.x < 0 ||
            this.head.x > this.board.width ||
            this.head.y < 0 ||
            this.head.y > this.board.height ||
            this.hasTouchHisBody());
    }
    hasTouchHisBody() {
        let node = this.head.next;
        while (node != null) {
            if (Math.abs(this.head.x - node.x) < 5 &&
                Math.abs(this.head.y - node.y) < 5)
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
        let x = 0, y = 0;
        switch (this.currentDirection) {
            case Direction_1.default.UP:
                y = 10;
                break;
            case Direction_1.default.LEFT:
                x = 10;
                break;
            case Direction_1.default.DOWN:
                y -= 10;
                break;
            case Direction_1.default.RIGHT:
                x = -10;
                break;
        }
        node.next = new SnakeBodyPart_1.default(this.ctx, this.board, null, node.x + x, node.y + y);
    }
    moveBody(x, y) {
        let prevX = this.head.x;
        let prevY = this.head.y;
        this.head.x += x;
        this.head.y += y;
        let node = this.head;
        while (node.next != null) {
            let x = 0, y = 0;
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
                case Direction_1.default.UP:
                    this.moveBody(0, -10);
                    break;
                case Direction_1.default.DOWN:
                    this.moveBody(0, 10);
                    break;
                case Direction_1.default.RIGHT:
                    this.moveBody(10, 0);
                    break;
                case Direction_1.default.LEFT:
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
exports.default = Snake;
//# sourceMappingURL=Snake.js.map