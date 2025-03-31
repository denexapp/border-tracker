"use server";

import { databaseIdBorderCrossings } from "@/consts";
import notion from "@/notion";

const addEntry = async () => {
  notion.pages.create({
    parent: {
      database_id: databaseIdBorderCrossings,
    },
    properties: {
      Name: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: "new entry yay",
            },
          },
        ],
      },
    },
  });
};

export default addEntry;
