"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = __importDefault(require("./Snake"));
const Food_1 = __importDefault(require("./Food"));
class Board {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.height = 500;
        this.width = 500;
        this.game = game;
        this.food = new Food_1.default(ctx, this);
        this.snake = new Snake_1.default(ctx, this, this.game, this.food);
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
exports.default = Board;
//# sourceMappingURL=Board.js.map