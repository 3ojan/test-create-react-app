

export const gameLogicActions = {
  START_GAME: 'START_GAME',
  STOP_GAME: 'STOP_GAME',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  NEXT_LEVEL: 'NEXT_LEVEL',
  RESTART: 'RESTART',
}

export const startGame = payload => ({
  type: gameLogicActions.START_GAME,
  payload
});

export const stopGame = payload => ({
  type: gameLogicActions.STOP_GAME,
  payload
});
export const correctAnswer = payload => ({
  type: gameLogicActions.ANSWER_CORRECT,
  payload
});
export const nextLevel = payload => ({
  type: gameLogicActions.NEXT_LEVEL,
  payload
});
export const restart = payload => ({
  type: gameLogicActions.RESTART,
  payload
});
