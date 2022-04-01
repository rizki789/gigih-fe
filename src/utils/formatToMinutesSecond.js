export const formatToMinutesSecond = (timeMS) => {
    const minutes = Math.floor(timeMS / 60000);
    const seconds = ((timeMS % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds ;
};