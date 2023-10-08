import { type FC, type PropsWithChildren, type ReactNode } from "react";

import { cn } from "../utils";

interface EmptyStateCardProps extends PropsWithChildren {
  icon: ReactNode;
  headerContent: string;
  paragraphContent: string;
  className?: string;
}

export const EmptyStateCard: FC<EmptyStateCardProps> = ({
  className,
  icon,
  headerContent,
  paragraphContent,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col py-10 items-center justify-center rounded-md border border-dashed border-secondary",
        className,
      )}
    >
      <div className="flex p-5 items-center justify-center rounded-full bg-secondary">
        <i className="flex items-center justify-center">{icon}</i>
      </div>

      <h2 className=" mt-6 text-xl font-semibold">{headerContent}</h2>

      <p
        className={cn("text-md mt-2 text-center leading-6 text-slate-500", {
          "mb-8 ": Boolean(children),
        })}
      >
        {paragraphContent}
      </p>
      {children}
    </div>
  );
};
