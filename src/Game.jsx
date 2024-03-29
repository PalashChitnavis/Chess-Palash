import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();
const possiblePlaces = [];
export const gameSubject = new BehaviorSubject();
let pieces = {
  from: null,
  to: null,
};

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
  pieces.from = null;
  pieces.to = null;
}

export function move(from, to, promotion) {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  try {
    chess.move(tempMove);
    possiblePlaces.forEach((place) => {
      document.getElementById(place).classList.remove("highlighted");
    });
    updateGame();
    console.log("valid move");
  } catch {
    console.log("invalid move");
  } finally {
    pieces.from = null;
    pieces.to = null;
  }
}

export function possibleMoves(square) {
  possiblePlaces.forEach((place) => {
    document.getElementById(place).classList.remove("highlighted");
  });
  const moves = chess.moves({ square: square, verbose: true });

  moves.forEach((move) => {
    possiblePlaces.push(move.to);
    document.getElementById(move.to).classList.add("highlighted");
  });
}

export function getPossibleMoves(square) {
  const moves = chess.moves({ square: square, verbose: true });
  return moves;
}

function updateGame(pendingPromotion) {
  const isGameOver = chess.isGameOver();
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    result: isGameOver ? getGameResult() : null,
  };
  gameSubject.next(newGame);
}

function getGameResult() {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === "b" ? "White" : "Black";
    return { type: "Checkmate", reason: winner };
  } else if (chess.isDraw()) {
    let reason = "5- Move Rule";
    if (chess.isStalemate()) {
      reason = "Stalemate";
    } else if (chess.isThreefoldRepetition()) {
      reason = "Repetition";
    } else if (chess.isInsufficientMaterial()) {
      reason = "Insufficient Material";
    }
    return { type: "Draw", reason: reason };
  }
}

export function resetGame() {
  chess.reset();
  updateGame();
}

export function getPiece(square) {
  const piece = chess.get(square);
  return piece;
}

export function setPiece(position, type) {
  console.log(`setting ${type} to ${position}`);
  type === "from" ? (pieces.from = position) : (pieces.to = position);
  if (pieces.from && pieces.to && pieces.from != pieces.to) {
    handleMove(pieces.from, pieces.to);
  }
}

export function getPiecesInfo() {
  return pieces;
}

export function boardInfo() {
  const turn = chess.turn();
  const history = chess.history({ verbose: true });

  return { turn, history };
}
