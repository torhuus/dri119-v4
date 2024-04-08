import { Token, getToken } from "@/actions/auth";
import TicketList from "@/components/ticket-list";
import { createPriorityBadge, translateStatus } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const TicketsPage = async ({ searchParams }: any) => {
  const token = (await getToken()) as Token;

  if (token.role === "USER") {
    redirect("/app");
  }

  return (
    <>
      <div className="bg-muted mx-[-1rem] mb-4">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">Henvendelser</h1>
          <p className="text-lg">
            {(searchParams.status && translateStatus(searchParams.status)) ||
              (searchParams.priority &&
                createPriorityBadge(searchParams.priority).label) ||
              "Alle"}
          </p>
        </div>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TicketList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default TicketsPage;
