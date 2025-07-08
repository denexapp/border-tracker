type WithClassName<T = object> = T & {
  className?: string;
};

export default WithClassName;
