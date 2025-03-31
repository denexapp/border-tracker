"use server";

import { signIn as nextAuthSignIn } from "@/auth";

const signIn = async () => {
  await nextAuthSignIn("github");
};

export default signIn;
