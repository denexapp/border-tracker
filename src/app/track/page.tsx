import addEntry from "@/actions/addEntry";
import { validateSession } from "@/auth";
import Button from "@/components/button";

export default async function Page() {
  await validateSession();

  return (
    <div className="grid place-items-center p-2">
      <div className="flex flex-col gap-4">
        <Button onClick={addEntry}>add arrival</Button>
        <Button onClick={addEntry}>add departure</Button>
      </div>
    </div>
  );
}
