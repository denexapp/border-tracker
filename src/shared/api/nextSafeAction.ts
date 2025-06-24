import { validateSession } from "@/auth";
import { createSafeActionClient } from "next-safe-action";

export const noAuthActionClient = createSafeActionClient({ throwValidationErrors: true });

export const authActionClient = noAuthActionClient.use(async ({ next }) => {
  await validateSession();

  return next();
});

// This is a wrapper for actions that are passed to the form `action` prop.
// It cuts off the return value, because the form action should not return anything.
export const wrapFormAction =
  <T extends unknown[]>(fn: (...args: T) => Promise<unknown>) =>
  async (...args: T) => {
    await fn(...args);
  };
