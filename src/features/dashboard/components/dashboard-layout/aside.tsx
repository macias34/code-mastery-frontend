import Link, { type LinkProps } from "next/link";
import React, { type FC, type PropsWithChildren } from "react";

export type AsideItem = LinkProps & PropsWithChildren;

interface AsideProps {
  items: AsideItem[];
}

export const Aside: FC<AsideProps> = ({ items }) => {
  return (
    <aside className="flex flex-col gap-6">
      {items.map(({ children, ...rest }, index) => (
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
