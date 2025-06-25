import { propertyNameDate } from "@/entities/entry/config/consts";
import { SimpleDate } from "@/shared/model/simpleDate/simpleDate";
import simpleDateToDateString from "@/shared/model/simpleDate/simpleDateToDateString";
import notion from "@/shared/notion/api/client";

const updateEntryDateAndTitle = async (id: string, date: SimpleDate, title: string) => {
  const dateString = simpleDateToDateString(date);

  await notion.pages.update({
    page_id: id,
    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      [propertyNameDate]: {
        type: "date",
        date: {
          start: dateString,
        },
      },
    },
  });
};

export default updateEntryDateAndTitle;
