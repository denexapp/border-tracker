import notion from "@/shared/notion/api/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const retrievePage = async (id: string): Promise<PageObjectResponse> => {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  return page;
};

export default retrievePage;
