import { Token, getToken } from "@/actions/auth";
import ScrollableFilterBar from "@/components/scrollable-filter-bar";
import TicketList from "@/components/ticket-list";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const TicketsPage = async ({ searchParams }: any) => {
  const token = (await getToken()) as Token;

  if (token.role === "USER") {
    redirect("/app");
  }

  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TicketList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default TicketsPage;
