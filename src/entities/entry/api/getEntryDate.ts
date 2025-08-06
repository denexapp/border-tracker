import { SimpleDate } from "@/shared/model/simpleDate/simpleDate";
import { fillableEntryFieldExtractors } from "../model/entry/entry";
import retrievePage from "@/shared/notion/api/retrievePage";

export const getEntryDate = async (id: string): Promise<SimpleDate | null> => {
  const page = await retrievePage(id);
  const dateField = await fillableEntryFieldExtractors.date(page);
  const date = dateField.value;

  return date;
};
