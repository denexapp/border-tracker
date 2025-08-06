import notion from "@/shared/notion/api/client";
import { PageObjectResponse, QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

interface Options {
  filter?: QueryDatabaseParameters["filter"];
  sorts?: QueryDatabaseParameters["sorts"];
}

const queryDatabasePage = async (databaseId: string, options?: Options): Promise<PageObjectResponse | null> => {
  const { filter, sorts } = options ?? {};

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts,
    filter,
  });

  const page = response.results.at(0);

  if (page === undefined) {
    return null;
  }

  if (page.object !== "page") {
    throw new Error("Expected a page object in the results");
  }

  if (!("properties" in page)) {
    throw new Error("Page object does not have properties");
  }

  return page;
};

export default queryDatabasePage;
