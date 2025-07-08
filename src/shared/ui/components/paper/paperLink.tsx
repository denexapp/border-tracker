import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import WithClassName from "../../helpers/withClassName";

interface PaperLinkProps {
  href: string;
}

const PaperLink: FC<PropsWithChildren<WithClassName<PaperLinkProps>>> = (props) => {
  const { children, href, className } = props;
  return (
    <Link
      className={twMerge(
        "bg-paper-bg border-primary-bg hover:border-primary-bg-hover active:border-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 rounded-3xl border-2 grid",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default PaperLink;
