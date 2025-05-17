import { auth } from "@/auth";
import { FC } from "react";
import ButtonForm from "./buttonForm";
import Text from "./text";
import signIn from "@/actions/signIn";
import signOut from "@/actions/signOut";

const User: FC = async () => {
  const session = await auth();

  if (session === null) {
    return <ButtonForm onClick={signIn}>sign in</ButtonForm>;
  }

  return (
    <div className="flex gap-2 items-center">
      <Text>{session.user?.login || "unknown user"}</Text>
      <ButtonForm onClick={signOut}>sign out</ButtonForm>
    </div>
  );
};

export default User;
