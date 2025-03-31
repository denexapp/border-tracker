import { auth } from "@/auth";
import { FC } from "react";
import Button from "./button";
import Text from "./text";
import signIn from "@/actions/signIn";
import signOut from "@/actions/signOut";

const User: FC = async () => {
  const session = await auth();

  if (session === null) {
    return <Button onClick={signIn}>sign in</Button>;
  }

  return (
    <div className="flex gap-2 items-center">
      <Text>{session.user?.login || "unknown user"}</Text>
      <Button onClick={signOut}>sign out</Button>
    </div>
  );
};

export default User;
