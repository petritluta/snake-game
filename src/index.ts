import Starter from './Starter';
import Game from './Game';

(async () => {
  const canvas = <HTMLCanvasElement>document.getElementById('game');
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const starter = new Starter(new Game(ctx));
    starter.start();
  } else {
    console.error("Your browser doesn't support canvas please change it");
  }
})();
