import { databaseIdBorderCrossings } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";

const addEntry = async () => {
  const page = await notion.pages.create({
    parent: {
      database_id: databaseIdBorderCrossings,
    },
    properties: {},
  });

  const { id } = page;
  return id;
};

export default addEntry;
