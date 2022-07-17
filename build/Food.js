"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Food {
    constructor(ctx, board) {
        this.value = 5;
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
    initCoords() {
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
exports.default = Food;
//# sourceMappingURL=Food.js.map