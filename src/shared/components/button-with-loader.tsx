import { cn } from "../utils";
import { Button } from "./button";
import { Spinner } from "./spinner";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  isLoading?: boolean;
};

export const ButtonWithLoader = ({
  className,
  isLoading,
  children,
  ...props
}: Props) => {
  return (
    <Button className={cn("", className)} {...props}>
      {isLoading ? <Spinner className="h-6 w-6" /> : children}
    </Button>
  );
};
