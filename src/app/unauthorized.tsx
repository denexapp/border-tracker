import { auth } from "@/auth";
import Text from "@/components/text";

export default async function Page() {
  const session = await auth();
  let text: string;

  if (session === null) {
    text = "sign in to see this page";
  } else {
    text = "you are not authorized to see this page";
  }

  return (
    <div className="grid place-items-center p-2">
      <Text>{text}</Text>
    </div>
  );
}
