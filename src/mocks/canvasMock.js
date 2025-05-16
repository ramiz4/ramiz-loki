// Mock implementation for canvas module
const createCanvasMock = () => {
  return {
    getContext: () => ({
      measureText: () => ({ width: 0 }),
      fillText: () => {},
      fill: () => {},
      beginPath: () => {},
      stroke: () => {},
      clearRect: () => {},
      arc: () => {},
      moveTo: () => {},
      lineTo: () => {},
      drawImage: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      fillRect: () => {},
      createLinearGradient: () => ({
        addColorStop: () => {},
      }),
    }),
    width: 0,
    height: 0,
    toDataURL: () => '',
    toBuffer: () => Buffer.from([]),
  };
};

const Canvas = jest.fn(createCanvasMock);
Canvas.createCanvas = jest.fn(createCanvasMock);
Canvas.Image = jest.fn(() => ({}));

module.exports = Canvas;
