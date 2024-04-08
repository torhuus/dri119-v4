import { getTickets } from "@/actions/ticket";
import TicketCard from "./ticket-card";
import { Ticket } from "@prisma/client";
import ScrollableFilterBar from "./scrollable-filter-bar";
import { Token, getToken } from "@/actions/auth";
import TicketListWrapper from "./ticket-list-wrapper";

const TicketList = async ({ searchParams }: any) => {
  const data = await getTickets(searchParams);
  const token = (await getToken()) as Token;

  return <TicketListWrapper data={data} token={token} />;
};

export default TicketList;
