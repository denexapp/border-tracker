import { databaseIdBorderCrossings, propertyNameNumber } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";

const addEntry = async (number: number) => {
  const page = await notion.pages.create({
    parent: {
      database_id: databaseIdBorderCrossings,
    },
    properties: {
      [propertyNameNumber]: {
        number: number,
      },
    },
  });

  const { id } = page;
  return id;
};

export default addEntry;
