"use server";

import { signOut as nextAuthSignOut } from "@/auth";

const signOut = async () => {
  await nextAuthSignOut({
    redirectTo: "/",
  });
};

export default signOut;
