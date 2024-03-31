export function formatSeconds(seconds) {
  const roudedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roudedSeconds / 60);
  const remainingSeconds = roudedSeconds % 60;

  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(remainingSeconds).padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
}

export function formatDate(date) {
  const beatDate = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = beatDate.toLocaleString("en-US", options);

  return formattedDate;
}
