import { databaseIdBorderCrossings, propertyNameAdditionalStatuses } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";

const updateEntryAdditionalStatuses = async (id: string, additionalStatuses: Array<string>) => {
  const database = await notion.databases.retrieve({
    database_id: databaseIdBorderCrossings,
  });

  const allAdditionalStatusesResponse = database.properties[propertyNameAdditionalStatuses];

  if (allAdditionalStatusesResponse === undefined) {
    throw new Error("Incorrect format");
  }

  if (allAdditionalStatusesResponse.type !== "multi_select") {
    throw new Error("Incorrect format");
  }

  const additionalStatusIds = additionalStatuses.map((id) => ({ id }));

  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameAdditionalStatuses]: {
        type: "multi_select",
        multi_select: additionalStatusIds,
      },
    },
  });
};

export default updateEntryAdditionalStatuses;
