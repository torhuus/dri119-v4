import { Token, getToken, signout } from "@/actions/auth";
import { getTicketById } from "@/actions/ticket";
import Pagetitle from "@/components/v2/pagetitle";
import TicketInformation from "@/components/v2/ticket-information";
import TicketMeta from "@/components/v2/ticketmeta";
import { Ticket } from "@prisma/client";

const TicketPage = async ({ params }: { params: { ticketId: string } }) => {
  const token = (await getToken()) as Token;
  if (!token) {
    signout();
  }
  const { data: ticket } = await getTicketById(params.ticketId);

  return (
    <>
      <Pagetitle backUrl="/app/tickets">Tilbake</Pagetitle>
      <div className="min-w-0 max-w-screen-lg w-full mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          <TicketMeta ticket={ticket as Ticket} />
          <TicketInformation ticket={ticket as Ticket} />
        </div>
      </div>
    </>
  );
};

export default TicketPage;
