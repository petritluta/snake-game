"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnakeBodyPart {
    constructor(ctx, board, next, x, y, height = 10, width = 10) {
        this.ctx = ctx;
        this.board = board;
        if (x && y) {
            this.x = x;
            this.y = y;
        }
        else {
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
    initCoords() {
        return [
            Math.random() * (this.board.width - 250) + 100,
            Math.random() * (this.board.height - 250) + 100,
        ];
    }
}
exports.default = SnakeBodyPart;
//# sourceMappingURL=SnakeBodyPart.js.map