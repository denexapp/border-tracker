import { locale } from "@/shared/config/consts";
import { SimpleDate } from "./simpleDate";

const intl = new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const simpleDateToFormattedString = (date: SimpleDate): string => {
  const { year, month, day } = date;
  const dateObject = new Date(year, month - 1, day);
  return intl.format(dateObject);
};

export default simpleDateToFormattedString;
