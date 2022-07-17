"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./Board"));
class Game {
    constructor(ctx) {
        this.board = new Board_1.default(ctx, this);
        this.score = 0;
        this.init();
    }
    init() {
        this.board.init();
    }
    changeScore(value) {
        this.score += value;
        const scoreElement = document.getElementById('score');
        if (scoreElement)
            scoreElement.innerText = this.score.toString();
    }
    start() {
        this.board.draw();
    }
    stop() {
        this.board.stop();
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map