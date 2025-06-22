import { auth } from "@/auth";
import { FC } from "react";
import ButtonForm from "../../shared/ui/buttonForm";
import Text from "../../shared/ui/text";
import signIn from "@/app/_api/signIn";
import signOut from "@/app/_api/signOut";

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
