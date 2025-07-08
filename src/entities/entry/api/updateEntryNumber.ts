import { propertyNameNumber } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";

const updateEntryNumber = async (id: string, number: number) => {
  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameNumber]: {
        type: "number",
        number,
      },
    },
  });
};

export default updateEntryNumber;
