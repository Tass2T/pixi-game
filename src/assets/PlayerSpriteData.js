// 1841 × 2400
export default {
  frames: {
    player_down1: {
      frame: { x: 0, y: 0, w: 460, h: 550 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_down2: {
      frame: { x: 460, y: 0, w: 460, h: 550 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_down3: {
      frame: { x: 920, y: 0, w: 460, h: 550 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    player_down4: {
      frame: { x: 1380, y: 0, w: 460, h: 550 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
  },
  meta: {
    image: "/src/assets/playerSpriteSheet.png",
    format: "RGBA8888",
    size: { w: 1080, h: 12 },
    scale: 10,
  },
  animations: {
    down: ["player_down1", "player_down2", "player_down3", "player_down4"],
  },
};
