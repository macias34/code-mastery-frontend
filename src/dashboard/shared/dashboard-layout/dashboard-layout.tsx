export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <main className=" min-h-screen bg-foreground text-secondary">
      {children}
    </main>
  );
};
