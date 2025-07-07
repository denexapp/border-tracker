import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface PaperLinkProps {
  href: string;
}

const PaperLink: FC<PropsWithChildren<PaperLinkProps>> = (props) => {
  const { children, href } = props;
  return (
    <Link
      className="bg-paper-bg border-paper-border hover:border-paper-border-hover active:border-paper-border-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 rounded-3xl border-2 grid"
      href={href}
    >
      {children}
    </Link>
  );
};

export default PaperLink;
