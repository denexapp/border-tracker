"use server";

import { signOut as nextAuthSignOut } from "@/auth";
import { noAuthActionClient } from "@/shared/api/nextSafeAction";

const signOut = noAuthActionClient.action(async () => {
  await nextAuthSignOut();
});

export default signOut;
