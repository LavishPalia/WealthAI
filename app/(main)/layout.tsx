import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return <div className="container mx-auto my-32">{children}</div>;
};

export default MainLayout;
