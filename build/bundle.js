/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Snake_1 = __importDefault(__webpack_require__(/*! ./Snake */ "./src/Snake.ts"));
const Food_1 = __importDefault(__webpack_require__(/*! ./Food */ "./src/Food.ts"));
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
exports["default"] = Board;


/***/ }),

/***/ "./src/Food.ts":
/*!*********************!*\
  !*** ./src/Food.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Food;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Board_1 = __importDefault(__webpack_require__(/*! ./Board */ "./src/Board.ts"));
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
exports["default"] = Game;


/***/ }),

/***/ "./src/Snake.ts":
/*!**********************!*\
  !*** ./src/Snake.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Direction_1 = __importDefault(__webpack_require__(/*! ./types/Direction */ "./src/types/Direction.ts"));
const SnakeBodyPart_1 = __importDefault(__webpack_require__(/*! ./SnakeBodyPart */ "./src/SnakeBodyPart.ts"));
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
exports["default"] = Snake;


/***/ }),

/***/ "./src/SnakeBodyPart.ts":
/*!******************************!*\
  !*** ./src/SnakeBodyPart.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = SnakeBodyPart;


/***/ }),

/***/ "./src/Starter.ts":
/*!************************!*\
  !*** ./src/Starter.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Starter {
    constructor(game) {
        this.game = game;
    }
    start() {
        this.game.start();
    }
}
exports["default"] = Starter;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Starter_1 = __importDefault(__webpack_require__(/*! ./Starter */ "./src/Starter.ts"));
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
(async () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        const starter = new Starter_1.default(new Game_1.default(ctx));
        starter.start();
    }
    else {
        console.error("Your browser doesn't support canvas please change it");
    }
})();


/***/ }),

/***/ "./src/types/Direction.ts":
/*!********************************!*\
  !*** ./src/types/Direction.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Direction;
(function (Direction) {
    Direction["UP"] = "UP";
    Direction["DOWN"] = "DOWN";
    Direction["LEFT"] = "LEFT";
    Direction["RIGHT"] = "RIGHT";
})(Direction || (Direction = {}));
exports["default"] = Direction;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0tBQ2pCO1NBQU07UUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7S0FDdkU7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDYkwsSUFBSyxTQUtKO0FBTEQsV0FBSyxTQUFTO0lBQ1osc0JBQVM7SUFDVCwwQkFBYTtJQUNiLDBCQUFhO0lBQ2IsNEJBQWU7QUFDakIsQ0FBQyxFQUxJLFNBQVMsS0FBVCxTQUFTLFFBS2I7QUFFRCxxQkFBZSxTQUFTLENBQUM7Ozs7Ozs7VUNQekI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9Gb29kLnRzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL1NuYWtlLnRzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvU25ha2VCb2R5UGFydC50cyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL1N0YXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL3R5cGVzL0RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU25ha2UgZnJvbSAnLi9TbmFrZSc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IEZvb2QgZnJvbSAnLi9Gb29kJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIHNuYWtlOiBTbmFrZTtcbiAgZ2FtZTogR2FtZTtcbiAgZm9vZDogRm9vZDtcblxuICBjb25zdHJ1Y3RvcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZ2FtZTogR2FtZSkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuaGVpZ2h0ID0gNTAwO1xuICAgIHRoaXMud2lkdGggPSA1MDA7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB0aGlzLmZvb2QgPSBuZXcgRm9vZChjdHgsIHRoaXMpO1xuICAgIHRoaXMuc25ha2UgPSBuZXcgU25ha2UoY3R4LCB0aGlzLCB0aGlzLmdhbWUsIHRoaXMuZm9vZCk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAncmVkJztcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSA1O1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5zdHJva2VSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnNuYWtlLmRyYXcoKTtcbiAgICB0aGlzLmZvb2QuZHJhdygpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zbmFrZS5pbml0KCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuc25ha2Uuc3RvcCgpO1xuXG4gICAgdGhpcy5jdHguZm9udCA9ICc0OHB4IHNhbnMtc2VyaWYnO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdZb3UgbG9zdCcsIHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xuICB9XG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb2Qge1xuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGJvYXJkOiBCb2FyZDtcbiAgdmFsdWUgPSA1O1xuXG4gIGNvbnN0cnVjdG9yKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBib2FyZDogQm9hcmQpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgY29uc3QgW3gsIHldID0gdGhpcy5pbml0Q29vcmRzKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBjaGFuZ2VQb3NpdGlvbigpIHtcbiAgICBjb25zdCBbeCwgeV0gPSB0aGlzLmluaXRDb29yZHMoKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBwcml2YXRlIGluaXRDb29yZHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIE1hdGgucmFuZG9tKCkgKiAodGhpcy5ib2FyZC53aWR0aCAtIDI1MCkgKyAxMDAsXG4gICAgICBNYXRoLnJhbmRvbSgpICogKHRoaXMuYm9hcmQuaGVpZ2h0IC0gMjUwKSArIDEwMCxcbiAgICBdO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIDUsIDUpO1xuICB9XG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICBib2FyZDogQm9hcmQ7XG5cbiAgc2NvcmU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoY3R4LCB0aGlzKTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5ib2FyZC5pbml0KCk7XG4gIH1cblxuICBjaGFuZ2VTY29yZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zY29yZSArPSB2YWx1ZTtcbiAgICBjb25zdCBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICBpZiAoc2NvcmVFbGVtZW50KSBzY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5zY29yZS50b1N0cmluZygpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5ib2FyZC5kcmF3KCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuYm9hcmQuc3RvcCgpO1xuICB9XG59XG4iLCJpbXBvcnQgRGlyZWN0aW9uIGZyb20gJy4vdHlwZXMvRGlyZWN0aW9uJztcbmltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkJztcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgRm9vZCBmcm9tICcuL0Zvb2QnO1xuaW1wb3J0IFNuYWtlQm9keVBhcnQgZnJvbSAnLi9TbmFrZUJvZHlQYXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2Uge1xuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgYm9hcmQ6IEJvYXJkO1xuICBjdXJyZW50RGlyZWN0aW9uOiBEaXJlY3Rpb247XG4gIGZvb2Q6IEZvb2Q7XG4gIGdhbWU6IEdhbWU7XG4gIGhlYWQ6IFNuYWtlQm9keVBhcnQ7XG5cbiAgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lciB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBib2FyZDogQm9hcmQsXG4gICAgZ2FtZTogR2FtZSxcbiAgICBmb29kOiBGb29kXG4gICkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIHRoaXMuZm9vZCA9IGZvb2Q7XG5cbiAgICB0aGlzLmN1cnJlbnREaXJlY3Rpb24gPSBEaXJlY3Rpb24uVVA7XG5cbiAgICB0aGlzLmhlYWQgPSBuZXcgU25ha2VCb2R5UGFydCh0aGlzLmN0eCwgdGhpcy5ib2FyZCwgbnVsbCk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGxldCBub2RlOiBTbmFrZUJvZHlQYXJ0IHwgbnVsbCA9IHRoaXMuaGVhZDtcbiAgICBkbyB7XG4gICAgICBub2RlLmRyYXcoKTtcbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgfSB3aGlsZSAobm9kZSAhPSBudWxsKTtcbiAgfVxuXG4gIGNoZWNrSWZBdGVGb29kKCkge1xuICAgIHJldHVybiAoXG4gICAgICBNYXRoLmFicyh0aGlzLmhlYWQueCAtIHRoaXMuZm9vZC54KSA8PSAxMCAmJlxuICAgICAgTWF0aC5hYnModGhpcy5oZWFkLnkgLSB0aGlzLmZvb2QueSkgPD0gMTBcbiAgICApO1xuICB9XG5cbiAgY2hlY2tJZkdhbWVJc0xvc3QoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuaGVhZC54IDwgMCB8fFxuICAgICAgdGhpcy5oZWFkLnggPiB0aGlzLmJvYXJkLndpZHRoIHx8XG4gICAgICB0aGlzLmhlYWQueSA8IDAgfHxcbiAgICAgIHRoaXMuaGVhZC55ID4gdGhpcy5ib2FyZC5oZWlnaHQgfHxcbiAgICAgIHRoaXMuaGFzVG91Y2hIaXNCb2R5KClcbiAgICApO1xuICB9XG5cbiAgaGFzVG91Y2hIaXNCb2R5KCkge1xuICAgIGxldCBub2RlID0gdGhpcy5oZWFkLm5leHQ7XG5cbiAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICBpZiAoXG4gICAgICAgIE1hdGguYWJzKHRoaXMuaGVhZC54IC0gbm9kZS54KSA8IDUgJiZcbiAgICAgICAgTWF0aC5hYnModGhpcy5oZWFkLnkgLSBub2RlLnkpIDwgNVxuICAgICAgKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhZGRCb2R5UGFydCgpIHtcbiAgICBsZXQgbm9kZSA9IHRoaXMuaGVhZDtcblxuICAgIHdoaWxlIChub2RlLm5leHQgIT0gbnVsbCkge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG5cbiAgICBsZXQgeCA9IDAsXG4gICAgICB5ID0gMDtcblxuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50RGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIERpcmVjdGlvbi5VUDpcbiAgICAgICAgeSA9IDEwO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgeCA9IDEwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRGlyZWN0aW9uLkRPV046XG4gICAgICAgIHkgLT0gMTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEaXJlY3Rpb24uUklHSFQ6XG4gICAgICAgIHggPSAtMTA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIG5vZGUubmV4dCA9IG5ldyBTbmFrZUJvZHlQYXJ0KFxuICAgICAgdGhpcy5jdHgsXG4gICAgICB0aGlzLmJvYXJkLFxuICAgICAgbnVsbCxcbiAgICAgIG5vZGUueCArIHgsXG4gICAgICBub2RlLnkgKyB5XG4gICAgKTtcbiAgfVxuXG4gIG1vdmVCb2R5KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgbGV0IHByZXZYID0gdGhpcy5oZWFkLng7XG4gICAgbGV0IHByZXZZID0gdGhpcy5oZWFkLnk7XG4gICAgdGhpcy5oZWFkLnggKz0geDtcbiAgICB0aGlzLmhlYWQueSArPSB5O1xuICAgIGxldCBub2RlID0gdGhpcy5oZWFkO1xuXG4gICAgd2hpbGUgKG5vZGUubmV4dCAhPSBudWxsKSB7XG4gICAgICBsZXQgeCA9IDAsXG4gICAgICAgIHkgPSAwO1xuXG4gICAgICBsZXQgdGVtcFByZXZYID0gcHJldlg7XG4gICAgICBsZXQgdGVtcFByZXZZID0gcHJldlk7XG4gICAgICBwcmV2WCA9IG5vZGUubmV4dC54O1xuICAgICAgcHJldlkgPSBub2RlLm5leHQueTtcbiAgICAgIG5vZGUubmV4dC54ID0gdGVtcFByZXZYICsgeDtcbiAgICAgIG5vZGUubmV4dC55ID0gdGVtcFByZXZZICsgeTtcbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgfVxuICB9XG5cbiAgbW92ZSgpIHtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnREaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uVVA6XG4gICAgICAgICAgdGhpcy5tb3ZlQm9keSgwLCAtMTApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5ET1dOOlxuICAgICAgICAgIHRoaXMubW92ZUJvZHkoMCwgMTApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5SSUdIVDpcbiAgICAgICAgICB0aGlzLm1vdmVCb2R5KDEwLCAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgICB0aGlzLm1vdmVCb2R5KC0xMCwgMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYm9hcmQuY2xlYXIoKTtcbiAgICAgIHRoaXMuYm9hcmQuZHJhdygpO1xuXG4gICAgICBpZiAodGhpcy5jaGVja0lmQXRlRm9vZCgpKSB7XG4gICAgICAgIHRoaXMuZm9vZC5jaGFuZ2VQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZEJvZHlQYXJ0KCk7XG4gICAgICAgIHRoaXMuZ2FtZS5jaGFuZ2VTY29yZSh0aGlzLmZvb2QudmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jaGVja0lmR2FtZUlzTG9zdCgpKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdG9wKCk7XG4gICAgICB9XG4gICAgfSwgMTUwKTtcbiAgfVxuXG4gIGNoYW5nZURpciA9IChrZXk6IHN0cmluZykgPT4ge1xuICAgIGxldCBuZXdEaXJlY3Rpb247XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJ3cnOlxuICAgICAgICBuZXdEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVVA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncyc6XG4gICAgICAgIG5ld0RpcmVjdGlvbiA9IERpcmVjdGlvbi5ET1dOO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBuZXdEaXJlY3Rpb24gPSBEaXJlY3Rpb24uTEVGVDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgbmV3RGlyZWN0aW9uID0gRGlyZWN0aW9uLlJJR0hUO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAodGhpcy5jdXJyZW50RGlyZWN0aW9uID09IERpcmVjdGlvbi5VUCAmJlxuICAgICAgICBuZXdEaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkRPV04pIHx8XG4gICAgICAodGhpcy5jdXJyZW50RGlyZWN0aW9uID09IERpcmVjdGlvbi5ET1dOICYmXG4gICAgICAgIG5ld0RpcmVjdGlvbiA9PSBEaXJlY3Rpb24uVVApIHx8XG4gICAgICAodGhpcy5jdXJyZW50RGlyZWN0aW9uID09IERpcmVjdGlvbi5SSUdIVCAmJlxuICAgICAgICBuZXdEaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkxFRlQpIHx8XG4gICAgICAodGhpcy5jdXJyZW50RGlyZWN0aW9uID09IERpcmVjdGlvbi5MRUZUICYmXG4gICAgICAgIG5ld0RpcmVjdGlvbiA9PSBEaXJlY3Rpb24uUklHSFQpXG4gICAgKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKG5ld0RpcmVjdGlvbikgdGhpcy5jdXJyZW50RGlyZWN0aW9uID0gbmV3RGlyZWN0aW9uO1xuICB9O1xuXG4gIGxpc3RlbigpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZURpcihldmVudC5rZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmxpc3RlbigpO1xuICAgIHRoaXMubW92ZSgpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmJvYXJkLmNsZWFyKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZUJvZHlQYXJ0IHtcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBuZXh0OiBTbmFrZUJvZHlQYXJ0IHwgbnVsbDtcbiAgYm9hcmQ6IEJvYXJkO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBib2FyZDogQm9hcmQsXG4gICAgbmV4dDogU25ha2VCb2R5UGFydCB8IG51bGwsXG4gICAgeD86IG51bWJlcixcbiAgICB5PzogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyID0gMTAsXG4gICAgd2lkdGg6IG51bWJlciA9IDEwXG4gICkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICBpZiAoeCAmJiB5KSB7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW3gsIHldID0gdGhpcy5pbml0Q29vcmRzKCk7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9XG4gICAgdGhpcy5uZXh0ID0gbmV4dDtcblxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgMTAsIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdENvb3JkcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgTWF0aC5yYW5kb20oKSAqICh0aGlzLmJvYXJkLndpZHRoIC0gMjUwKSArIDEwMCxcbiAgICAgIE1hdGgucmFuZG9tKCkgKiAodGhpcy5ib2FyZC5oZWlnaHQgLSAyNTApICsgMTAwLFxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0ZXIge1xuICBnYW1lOiBHYW1lO1xuXG4gIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5nYW1lLnN0YXJ0KCk7XG4gIH1cbn1cbiIsImltcG9ydCBTdGFydGVyIGZyb20gJy4vU3RhcnRlcic7XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuXG4oYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgaWYgKGN0eCkge1xuICAgIGNvbnN0IHN0YXJ0ZXIgPSBuZXcgU3RhcnRlcihuZXcgR2FtZShjdHgpKTtcbiAgICBzdGFydGVyLnN0YXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIllvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgY2FudmFzIHBsZWFzZSBjaGFuZ2UgaXRcIik7XG4gIH1cbn0pKCk7XG4iLCJlbnVtIERpcmVjdGlvbiB7XG4gIFVQID0gJ1VQJyxcbiAgRE9XTiA9ICdET1dOJyxcbiAgTEVGVCA9ICdMRUZUJyxcbiAgUklHSFQgPSAnUklHSFQnLFxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXJlY3Rpb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=