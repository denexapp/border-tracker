import addEntryAndRedirect from "@/app/_api/addEntryAndRedirect";
import ButtonForm from "@/shared/ui/buttonForm";
import H1 from "@/shared/ui/h1";
import { FC } from "react";

const Page: FC = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-2">
      <H1>border tracker</H1>
      <ButtonForm onClick={addEntryAndRedirect}>add new entry</ButtonForm>
    </div>
  );
};

export default Page;
