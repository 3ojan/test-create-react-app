

export const animationsActions = {
  ANIMATE_RED: 'ANIMATE_RED',
  ANIMATE_GREEN: 'ANIMATE_GREEN',
}

export const animateRed = payload => ({
  type: animationsActions.ANIMATE_RED,
  payload
});
export const animateGreen = payload => ({
  type: animationsActions.ANIMATE_GREEN,
  payload
});
