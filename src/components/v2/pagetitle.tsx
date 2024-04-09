import { ArrowLeftCircle, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const Pagetitle = ({
  children,
  backUrl,
}: {
  children: React.ReactNode;
  backUrl: string;
}) => {
  return (
    <div className="min-w-0 max-w-screen-lg w-full mx-auto my-4">
      {backUrl === "" ? (
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {children}
        </h2>
      ) : (
        <Link href={backUrl} className="flex items-center gap-4">
          <ArrowLeftCircle className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {children}
          </h2>
        </Link>
      )}
    </div>
  );
};

export default Pagetitle;
