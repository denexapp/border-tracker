import Button from "@/components/button";
import H1 from "@/components/h1";
import signIn from "../actions/signIn";
import { auth } from "@/auth";
import { ReactNode } from "react";
import ButtonLink from "@/components/buttonLink";

export default async function Page() {
  const session = await auth();
  const username = session?.user?.name ?? undefined;

  let content: ReactNode;

  if (session === null) {
    content = <Button onClick={signIn}>sign in</Button>;
  } else {
    content = (
      <>
        <ButtonLink href="/track">track</ButtonLink>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <H1>border tracker</H1>
      <div className="flex flex-col gap-4">{content}</div>
    </div>
  );
}
