import Link, { type LinkProps } from "next/link";
import React, { type FC, type PropsWithChildren, type ReactNode } from "react";

export interface AsideItem extends LinkProps, PropsWithChildren {
  icon?: ReactNode;
}

interface AsideProps {
  items: AsideItem[];
}

export const Aside: FC<AsideProps> = ({ items }) => {
  return (
    <aside className="flex flex-col gap-2 pr-10 py-8 border-r border-r-border w-60">
      {items.map(({ children, icon, ...rest }, index) => (
        <Link
          className="hover:bg-slate-700 transition px-4 py-2 rounded flex gap-4 items-center"
          key={index}
          {...rest}
        >
          {icon}
          {children}
        </Link>
      ))}
    </aside>
  );
};
