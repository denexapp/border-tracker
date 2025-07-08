import { FC, PropsWithChildren, unstable_ViewTransition as ReactViewTransition } from "react";

type ViewTransitionName =
  | "h1-transition"
  | `entry-transition-${string}`
  | "action-button-group-transition"
  | "action-button-1-transition"
  | "action-button-2-transition";

interface ViewTransitionProps {
  name: ViewTransitionName;
}

const ViewTransition: FC<PropsWithChildren<ViewTransitionProps>> = (props) => {
  const { name, children } = props;

  return <ReactViewTransition name={name}>{children}</ReactViewTransition>;
};

export default ViewTransition;
