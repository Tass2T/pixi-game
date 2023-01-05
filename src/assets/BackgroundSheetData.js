export default {
  frames: {
    wall: {
      frame: { x: 32, y: 0, w: 64, h: 64 },
      sourceSize: { w: 34, h: 64 },
      spriteSourceSize: { x: 32, y: 0, w: 64, h: 64 },
    },
    ground: {
      frame: { x: 132, y: 384, w: 54, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 54, h: 32 },
    },
  },
  meta: {
    image: "/src/assets/backgroundSheet.png",
    format: "RGBA8888",
    size: { w: 1080, h: 12 },
    scale: 1,
  },
  animations: {
    wall: ["wall"],
  },
};
