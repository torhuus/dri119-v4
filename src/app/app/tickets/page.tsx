import { Token, getToken } from "@/actions/auth";
import { getTickets } from "@/actions/ticket";
import Pagetitle from "@/components/v2/pagetitle";
import TicketsList from "@/components/v2/tickets-list";

const TicketsPage = async () => {
  const tickets = await getTickets();
  const token = (await getToken()) as Token;

  if (!tickets || tickets.data.length === 0) {
    ("Ingen henvendelser funnet...");
  }

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <Pagetitle backUrl="">Henvendelser</Pagetitle>
      <TicketsList tickets={tickets.data} token={token} />
    </div>
  );
};

export default TicketsPage;
