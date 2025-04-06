import addEntryAndRedirect from "@/actions/addEntryAndRedirect";
import Button from "@/components/button";
import H1 from "@/components/h1";
import { FC } from "react";

const Page: FC = async () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-2">
      <H1>border tracker</H1>
      <Button onClick={addEntryAndRedirect}>add new entry</Button>
    </div>
  );
};

export default Page;
