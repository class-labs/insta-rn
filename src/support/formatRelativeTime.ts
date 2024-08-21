const SECOND = 1000; // milliseconds
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY; // ish
const YEAR = 365 * DAY;

const units = {
  second: { plural: "seconds" },
  minute: { plural: "minutes" },
  hour: { plural: "hours" },
  day: { plural: "days" },
  month: { plural: "months" },
  year: { plural: "years" },
};

type Unit = keyof typeof units;

function format(i: number, unit: Unit) {
  const num = Math.abs(i);
  const plural = units[unit].plural;
  const formatted =
    num === 1 ? `1 ${unit}` : `${num.toLocaleString()} ${plural}`;
  return i < 0 ? `${formatted} ago` : formatted;
}

export function formatRelativeTime(
  fromDate: string | Date,
  toDate: Date = new Date(),
) {
  const ms = new Date(fromDate).valueOf() - toDate.valueOf();
  const absoluteMs = Math.abs(ms);
  if (absoluteMs > YEAR) {
    return format(Math.round(ms / YEAR), "year");
  }
  if (absoluteMs > MONTH) {
    return format(Math.round(ms / MONTH), "month");
  }
  if (absoluteMs > DAY) {
    return format(Math.round(ms / DAY), "day");
  }
  if (absoluteMs > HOUR) {
    return format(Math.round(ms / HOUR), "hour");
  }
  if (absoluteMs > MINUTE) {
    return format(Math.round(ms / MINUTE), "minute");
  }
  return format(Math.round(ms / 1000), "second");
}
