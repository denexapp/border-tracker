"use server";

import { signIn as nextAuthSignIn } from "@/auth";
import { noAuthActionClient } from "@/shared/api/nextSafeAction";

const signIn = noAuthActionClient.action(async () => {
  await nextAuthSignIn("github");
});

export default signIn;
