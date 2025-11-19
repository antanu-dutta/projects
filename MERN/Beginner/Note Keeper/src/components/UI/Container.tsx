import { type ReactNode } from "react";

type PropType = {
  children: ReactNode;
};

const Container = ({ children }: PropType) => {
  return <div className="max-w-7xl mx-auto p-3">{children}</div>;
};

export default Container;
