import Button from "@/components/button";
import H1 from "@/components/h1";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 row-start-2 items-center">
      <H1>Border Tracker</H1>
      <div className="flex flex-col gap-4">
        <Button>Add arrival</Button>
        <Button>Add departure</Button>
      </div>
    </div>
  );
}
