import { SimpleDate } from "@/models/simpleDate/simpleDate";
import { headers } from "next/headers";

const estimateUserDate = async (): Promise<SimpleDate | null> => {
  const requestHeaders = await headers();

  const timeZone = requestHeaders.get("x-vercel-ip-timezone");

  if (timeZone === null) {
    console.debug("Vercel ip timezone header is not available");
    return null;
  }

  console.debug("Vercel ip timezone header:", timeZone);

  const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
    numberingSystem: "latn",
    calendar: "gregory",
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let year: number | undefined;
  let month: number | undefined;
  let day: number | undefined;

  const parts = dateTimeFormat.formatToParts(new Date());

  for (const part of parts) {
    if (part.type === "year") year = parseInt(part.value, 10);
    else if (part.type === "month") month = parseInt(part.value, 10);
    else if (part.type === "day") day = parseInt(part.value, 10);
    if (year !== undefined && month !== undefined && day !== undefined) {
      break;
    }
  }

  if (year === undefined || month === undefined || day === undefined) {
    throw new Error("Failed to parse date parts: " + JSON.stringify(parts));
  }

  const estimatedUserDate: SimpleDate = {
    year,
    month,
    day,
  };

  console.debug("Estimated user date:", JSON.stringify(estimatedUserDate, null, 2));

  return estimatedUserDate;
};

export default estimateUserDate;
