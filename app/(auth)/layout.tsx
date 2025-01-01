import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-center pt-40">{children}</div>;
};

export default AuthLayout;
