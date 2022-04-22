/* eslint-disable import/prefer-default-export */
export const formatToMinutesSecond = (timeMs) => {
  const minutes = Math.floor(timeMs / 60000);
  const seconds = ((timeMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
