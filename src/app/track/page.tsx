import addEntry from "@/actions/addEntry";
import { validateSession } from "@/auth";
import Button from "@/components/button";
import H1 from "@/components/h1";

export default async function Page() {
  await validateSession();

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={addEntry}>add arrival</Button>
      <Button onClick={addEntry}>add departure</Button>
    </div>
  );
}
