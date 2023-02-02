export const background = {
  frames: {
    wall: {
      frame: { x: 32, y: 0, w: 64, h: 64 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    ground: {
      frame: { x: 132, y: 384, w: 54, h: 32 },
      sourceSize: { w: 42, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 54, h: 32 },
    },
  },
  meta: {
    image: "/src/assets/background/backgroundSheet.png",
    format: "RGBA8888",
    size: { w: 1080, h: 12 },
    scale: 1,
  },
  animations: {
    wall: ["wall"],
  },
};

export const explosion = {
  frames: {
    explosion_1: {
      frame: { x: 0, y: 0 },
    },
  },
  meta: {
    image: "src/assets/bullets/explosion",
    format: "RGBA8888",
    size: { w: 1080, h: 12 },
    scale: 1,
  },
  animations: {
    explosion: ["explosion_1"],
  },
};

// 1841 × 2400
export const player = {
  frames: {
    player_down1: {
      frame: { x: 0, y: 0, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_down2: {
      frame: { x: 460, y: 0, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_down3: {
      frame: { x: 920, y: 0, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_down4: {
      frame: { x: 1380, y: 0, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_right1: {
      frame: { x: 0, y: 590, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_right2: {
      frame: { x: 460, y: 590, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_right3: {
      frame: { x: 920, y: 590, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_right4: {
      frame: { x: 1380, y: 590, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_left1: {
      frame: { x: 0, y: 1185, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_left2: {
      frame: { x: 460, y: 1185, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_left3: {
      frame: { x: 920, y: 1185, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_left4: {
      frame: { x: 1380, y: 1185, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_up1: {
      frame: { x: 0, y: 1810, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_up2: {
      frame: { x: 460, y: 1810, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_up3: {
      frame: { x: 920, y: 1810, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_up4: {
      frame: { x: 1380, y: 1810, w: 460, h: 590 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
  },
  meta: {
    image: "/src/assets/player/playerSpriteSheet.png",
    format: "RGBA8888",
    size: { w: 1080, h: 12 },
    scale: 10,
  },
  animations: {
    down: ["player_down1", "player_down2", "player_down3", "player_down4"],
    right: ["player_right1", "player_right2", "player_right3", "player_right4"],
    left: ["player_left1", "player_left2", "player_left3", "player_left4"],
    up: ["player_up1", "player_up2", "player_up3", "player_up4"],
  },
};
