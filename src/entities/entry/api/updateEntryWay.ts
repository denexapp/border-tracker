import { databaseIdBorderCrossings, propertyNameWay } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";

const updateEntryWay = async (id: string, way: string) => {
  const database = await notion.databases.retrieve({
    database_id: databaseIdBorderCrossings,
  });

  const allWaysResponse = database.properties[propertyNameWay];

  if (allWaysResponse === undefined) {
    throw new Error("Incorrect format");
  }

  if (allWaysResponse.type !== "select") {
    throw new Error("Incorrect format");
  }

  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameWay]: {
        type: "select",
        select: { id: way },
      },
    },
  });
};

export default updateEntryWay;
