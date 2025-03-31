import Button from "@/components/button";
import H1 from "@/components/h1";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 row-start-2 items-center">
      <H1>border tracker</H1>
      <div className="flex flex-col gap-4">
        <Button>add arrival</Button>
        <Button>add departure</Button>
      </div>
    </div>
  );
}
