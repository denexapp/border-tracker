import { SimpleDate } from "@/shared/model/simpleDate/simpleDate";
import { Direction } from "../model/direction/direction";

export const createEntryTitle = (direction: Direction, date: SimpleDate): string => {
  const directionEmoji = direction === "arrival" ? "⏪" : "⏩";
  const { year, month, day } = date;
  const formattedDate = `${day}.${month.toString().padStart(2, "0")}.${year}`;
  return `${directionEmoji} ${formattedDate}`;
};
