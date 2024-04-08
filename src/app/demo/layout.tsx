import { ReactNode } from "react";

const DemoLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="px-4 pt-20">{children}</main>
    </>
  );
};

export default DemoLayout;
