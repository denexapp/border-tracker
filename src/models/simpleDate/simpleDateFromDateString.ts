import { SimpleDate } from "./simpleDate";

const simpleDateFromDateString = (dateString: string): SimpleDate => {
  const dateParts = dateString.split("-");

  if (dateParts.length !== 3) {
    throw new Error("Incorrect format");
  }

  const [year, month, day] = dateParts.map((value) => Number.parseInt(value, 10));

  return {
    year,
    month,
    day,
  };
};
export default simpleDateFromDateString;
