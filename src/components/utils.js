export function formatSeconds(seconds) {
  const roudedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roudedSeconds / 60);
  const remainingSeconds = roudedSeconds % 60;

  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(remainingSeconds).padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
}
