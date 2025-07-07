import { databaseIdBorderCrossings, propertyNameAdditionalStatuses } from "@/entities/entry/config/consts";
import retrieveCachedDatabase from "@/shared/notion/api/cachedFunctions/retrieveCachedDatabase";
import { SelectItem } from "../../model/selectItem/selectItem";
import { EntryField, EntryFieldExtractor } from "../entryFieldExtractor";

export const additionalStatuses: EntryFieldExtractor<Array<string>, Array<SelectItem>> = async (page) => {
  const selectedAdditionalStatuses = page.properties[propertyNameAdditionalStatuses];

  if (selectedAdditionalStatuses === undefined) {
    throw new Error("Incorrect format");
  }

  if (selectedAdditionalStatuses.type !== "multi_select") {
    throw new Error("Incorrect format");
  }

  const database = await retrieveCachedDatabase(databaseIdBorderCrossings);

  const allAdditionalStatuses = database.properties[propertyNameAdditionalStatuses];

  if (allAdditionalStatuses === undefined) {
    throw new Error("Incorrect format");
  }

  if (allAdditionalStatuses.type !== "multi_select") {
    throw new Error("Incorrect format");
  }

  const filled = selectedAdditionalStatuses.multi_select.length !== 0;

  const value = selectedAdditionalStatuses.multi_select.map((status) => status.id);

  const meta = allAdditionalStatuses.multi_select.options.map<SelectItem>(({ id, name }) => ({
    id,
    name,
  }));

  const result: EntryField<Array<string>, Array<SelectItem>> = {
    filled,
    value,
    meta,
  };

  return result;
};
