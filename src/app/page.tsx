import ButtonLink from "@/components/buttonLink";
import H1 from "@/components/h1";

export default async function Page() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-2">
      <H1>border tracker</H1>
      <ButtonLink href="/track">track</ButtonLink>
    </div>
  );
}
