export const trimName = (name: string, length: number): string =>
  name.length && name.length > length
    ? `${name.substring(0, length - 2)}...`
    : name;

export const formatNumberLength = (value: number, length: number): string => {
  let stringValue = value.toString();
  while (stringValue.length < length) {
    stringValue = `0${stringValue}`;
  }
  return stringValue;
};

export const formatMilliseconds = (time: string): number => {
  const timeParts = time.split(':');
  const minutes = Number(timeParts[0]);
  const seconds = Number(timeParts[1]);
  const timeLimit = (minutes * 60 + seconds) * 1000;
  return timeLimit;
};

export const formatTime = (elapsedTime: number): string => {
  const minutes = formatNumberLength(Math.floor((elapsedTime / 60000) % 60), 2);
  const seconds = formatNumberLength(Math.floor((elapsedTime / 1000) % 60), 2);
  return `${minutes}:${seconds}`;
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = (date?: number): string => {
  if (date) {
    const dateObject = new Date(date);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const day = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();

    return `${hours}:${minutes}, ${day} ${MONTH_NAMES[monthIndex]} ${year}`;
  } else {
    return '---';
  }
};
