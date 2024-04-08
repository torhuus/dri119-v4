"use client";

import { Token } from "@/actions/auth";
import ScrollableFilterBar from "./scrollable-filter-bar";
import TicketCard from "./ticket-card";
import { Ticket } from "@prisma/client";
import { useState } from "react";

const TicketListWrapper = ({ data, token }: { data: any; token: Token }) => {
  const [tickets, setTickets] = useState<Ticket[]>(data.data);
  return (
    <>
      <div className="mx-[-1rem] mb-4">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">Henvendelser</h1>
          <ScrollableFilterBar
            token={token}
            setTickets={setTickets}
            tickets={data.data}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {tickets.length > 0
          ? tickets.map((ticket: Ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          : "Ingen henvendelser enda..."}
      </div>
    </>
  );
};

export default TicketListWrapper;
