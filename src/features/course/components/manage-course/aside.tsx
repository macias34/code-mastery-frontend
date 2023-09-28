import Link, { type LinkProps } from "next/link";
import React, { type FC, type PropsWithChildren } from "react";

export type LinkItem = LinkProps & PropsWithChildren;

interface AsideProps {
  linkItems: LinkItem[];
}

export const Aside: FC<AsideProps> = ({ linkItems }) => {
  return (
    <aside className="flex flex-col gap-6 pt-10">
      {linkItems.map(({ children, ...rest }, index) => (
        <Link className=" font-semibold text-lg" key={index} {...rest}>
          {children}
        </Link>
      ))}
    </aside>
  );
};
