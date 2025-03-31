import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface ButtonLinkProps {
  href: string;
}

const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = (props) => {
  const { href, children } = props;
  return (
    <Link
      href={href}
      className="text-base font-medium bg-primary-bg hover:bg-primary-bg-hover active:bg-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 text-primary-text py-3 px-6 rounded-2xl"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
