export const lambdaURL =
  'https://n7ar1nz8xj.execute-api.us-west-2.amazonaws.com/main/logVisit';

export const getRects = (container) => {
  return [
    container.getClientRects()[0].width,
    container.getClientRects()[0].height,
  ];
};

export const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export { default as triggerFireworks } from './triggerFireworks';
