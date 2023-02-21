export const WIDTH = 1080;
export const HEIGHT = 1080;
export const DEFAULT_FRAME = 1;
export const ANIMATION_SPEED = 0.09;
export const CHARACTER_SPEED = 5;
export const BULLET_SPEED = 15;
export const CONTROLS = {
  UP: 87,
  DOWN: 83,
  LEFT: 65,
  RIGHT: 68,
};
export const VILLAIN_SPAWN_DIRECTION = ["UP", "DOWN", "LEFT", "RIGHT"];
export const VILLAIN_SPEED = 0.8;
export const MAX_NUMBER_OF_VILLAIN = 35;

// LEVEL
export const BACKGROUND_SPRITE_SIZE = 270;
export const BACKGROUND_SPRITE_NUMBER = Math.ceil(
  WIDTH / BACKGROUND_SPRITE_SIZE
);
export const BACKGROUND_SPRITE_KIND_NUMBER = 5;
