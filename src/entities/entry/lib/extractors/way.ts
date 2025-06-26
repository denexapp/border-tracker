import { databaseIdBorderCrossings, propertyNameWay } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";
import { SelectItem } from "../../model/selectItem/selectItem";
import { EntryField, EntryFieldExtractor } from "../entryFieldExtractor";

export const way: EntryFieldExtractor<string | null, Array<SelectItem>> = async (page) => {
  const selectedWay = page.properties[propertyNameWay];

  if (selectedWay === undefined) {
    throw new Error("Incorrect format");
  }

  if (selectedWay.type !== "select") {
    throw new Error("Incorrect format");
  }

  const database = await notion.databases.retrieve({
    database_id: databaseIdBorderCrossings,
  });

  const allWays = database.properties[propertyNameWay];

  if (allWays === undefined) {
    throw new Error("Incorrect format");
  }

  if (allWays.type !== "select") {
    throw new Error("Incorrect format");
  }

  const filled = selectedWay.select !== null;

  const value = selectedWay.select?.id ?? null;

  const meta = allWays.select.options.map<SelectItem>(({ id, name }) => ({
    id,
    name,
  }));

  const result: EntryField<string | null, Array<SelectItem>> = {
    filled,
    value,
    meta,
  };

  return result;
};
