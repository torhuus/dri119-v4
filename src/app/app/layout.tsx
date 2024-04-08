import { ReactNode } from "react";
import Header from "@/components/header";

const DemoLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grow">
      <Header />
      <main className="px-4 pb-8 ">{children}</main>
    </div>
  );
};

export default DemoLayout;
