import React, { FC, PropsWithChildren } from "react";

export const ShopLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className=" min-h-screen">{children}</main>;
};
