import { SimpleDate } from "@/shared/model/simpleDate/simpleDate";
import { fillableEntryFieldExtractors } from "../model/entry/entry";
import retrievePageWithProperties from "@/shared/notion/api/retrievePageWithProperties";

export const getEntryDate = async (id: string): Promise<SimpleDate | null> => {
  const page = await retrievePageWithProperties(id);
  const dateField = await fillableEntryFieldExtractors.date(page);
  const date = dateField.value;

  return date;
};
