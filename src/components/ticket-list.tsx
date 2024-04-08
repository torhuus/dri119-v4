import { getTickets } from "@/actions/ticket";
import TicketCard from "./ticket-card";
import { Ticket } from "@prisma/client";

const TicketList = async ({ searchParams }: any) => {
  const data = await getTickets(searchParams);

  return (
    <div className="flex flex-col gap-4">
      {data.data.length > 0
        ? data.data.map((ticket: Ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        : "Ingen henvendelser enda..."}
    </div>
  );
};

export default TicketList;
