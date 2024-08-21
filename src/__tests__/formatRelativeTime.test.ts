import { formatRelativeTime } from "../support/formatRelativeTime";

describe("formatRelativeTime", () => {
  const fromDate = new Date("2024-01-03T08:00:00");

  it("Should compute elapsed time in hours", () => {
    const result = formatRelativeTime(
      fromDate,
      new Date("2024-01-04T08:00:00"),
    );
    expect(result).toEqual("24 hours ago");
  });

  it("Should compute elapsed in minutes", () => {
    const result = formatRelativeTime(
      fromDate,
      new Date("2024-01-03T08:21:00"),
    );
    expect(result).toEqual("21 minutes ago");
  });

  it("Should compute elapsed in seconds", () => {
    const result = formatRelativeTime(
      fromDate,
      new Date("2024-01-03T08:00:19"),
    );
    expect(result).toEqual("19 seconds ago");
  });
});
