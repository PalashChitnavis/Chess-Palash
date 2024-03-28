import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();
const possiblePlaces = [];
export const gameSubject = new BehaviorSubject();

export function initGame() {
  updateGame();
}

export function handleMove(from, to) {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();
  if (!pendingPromotion) {
    move(from, to);
  }
}

export function move(from, to) {
  const move = chess.move({ from, to });
  if (move) {
    possiblePlaces.forEach((place) => {
      document.getElementById(place).classList.remove("highlighted");
    });
    updateGame();
  }
}

export function possibleMoves(square) {
  possiblePlaces.forEach((place) => {
    document.getElementById(place).classList.remove("highlighted");
  });
  const moves = chess.moves({ square: square, verbose: true });
  console.log(`Possible moves for ${square}:`);
  moves.forEach((move) => {
    possiblePlaces.push(move.to);
    document.getElementById(move.to).classList.add("highlighted");
  });
}

function updateGame(pendingPromotion) {
  const newGame = {
    board: chess.board(),
    pendingPromotion,
  };
  gameSubject.next(newGame);
}
