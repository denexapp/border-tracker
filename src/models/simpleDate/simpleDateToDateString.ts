import { SimpleDate } from "./simpleDate";

const simpleDateToDateString = (date: SimpleDate): string => {
  const { year, month, day } = date;

  const yearString = year.toString().padStart(4, "0");
  const monthString = month.toString().padStart(2, "0");
  const dayString = day.toString().padStart(2, "0");

  return `${yearString}-${monthString}-${dayString}`;
};

export default simpleDateToDateString;
