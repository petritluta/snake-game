"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Starter_1 = __importDefault(require("./Starter"));
const Game_1 = __importDefault(require("./Game"));
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
//# sourceMappingURL=index.js.map