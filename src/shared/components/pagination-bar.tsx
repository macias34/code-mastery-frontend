import {
  Pagination,
  type PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/pagination";

import { cn } from "@/shared/utils";

interface Props {
  previousClick?: () => void;
  nextClick?: () => void;
  setPage?: (page: number) => void;
  totalPages: number;
  currentPage: number;
}

export const PaginationBar = ({
  nextClick,
  previousClick,
  currentPage,
  totalPages,
  setPage,
}: Props) => {
  if (totalPages === 0) return null;
  const renderItem = ({ ref, value, isActive }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <>
          {currentPage === totalPages - 1 ? null : (
            <button
              className="rounded-r-lg flex items-center justify-center px-4 h-10 ml-0 leading-tight borderrounded-r-lg border bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
              onClick={nextClick}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          )}
        </>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <>
          {" "}
          {currentPage === 0 ? null : (
            <button
              className={
                "rounded-l-lg flex items-center justify-center px-4 h-10 ml-0 leading-tight borderrounded-l-lg border bg-accent border-slate-700 text-slate-400 hover:bg-background hover:text-foreground"
              }
              onClick={previousClick}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          )}
        </>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button className=" flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-slate-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default">
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-slate-700 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
          isActive &&
            "z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        )}
        onClick={() => setPage && setPage(value - 1)}
      >
        {value}
      </button>
    );
  };

  return (
    <nav className="flex flex-col justify-between items-center my-4 mx-auto gap-y-5">
      <Pagination
        disableCursorAnimation
        showControls
        total={totalPages}
        initialPage={1}
        page={currentPage + 1}
        className="gap-2"
        radius="full"
        renderItem={renderItem}
        variant="light"
        classNames={{
          wrapper: "flex items-center -space-x-px h-8 text-sm gap-0",
        }}
      />
      <p className="text-slate-300">
        Strona {currentPage + 1} z {totalPages}
      </p>
    </nav>
  );
};
