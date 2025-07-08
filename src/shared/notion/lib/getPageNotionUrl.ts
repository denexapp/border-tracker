import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notionSchema = "notion";

const getPageNotionUrl = (page: PageObjectResponse): string => {
  // https://stackoverflow.com/questions/77062597/why-cant-the-protocol-of-an-url-object-be-changed-for-non-https-urls-in-javas
  const httpsUrl = new URL(page.url);
  const notionUrl = new URL(`${notionSchema}://example.com`);
  notionUrl.host = httpsUrl.host;
  notionUrl.pathname = httpsUrl.pathname;
  return notionUrl.toString();
};

export default getPageNotionUrl;
