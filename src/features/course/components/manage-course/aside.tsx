import Link, { type LinkProps } from "next/link";
import React, { type FC, type PropsWithChildren } from "react";

export type LinkItem = LinkProps & PropsWithChildren;

interface AsideProps {
  linkItems: LinkItem[];
}

export const Aside: FC<AsideProps> = ({ linkItems }) => {
  return (
    <aside className="flex flex-col gap-6">
      {linkItems.map(({ children, ...rest }, index) => (
        <Link
          className=" font-semibold hover:text-white/80 transition"
          key={index}
          {...rest}
        >
          {children}
        </Link>
      ))}
    </aside>
  );
};
