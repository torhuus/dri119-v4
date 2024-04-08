import { Token, getToken } from "@/actions/auth";
import {
  deleteTicket,
  deleteTicketById,
  getTicketById,
} from "@/actions/ticket";
import TicketViewForm from "@/components/forms/ticket-view-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const TicketViewPage = async ({ params }: any) => {
  const ticket = await getTicketById(params.ticketId);

  const token = (await getToken()) as Token;

  if (token.role === "USER") {
    redirect("/app");
  }

  return (
    <>
      <div className="mt-8 flex justify-between items-center mb-6">
        <Link href={"/app/tickets"} className="flex gap-2 items-center">
          <ArrowLeftCircle className="h-8 w-8" />
          <span className="text-lg font-semibold">Tilbake</span>
        </Link>
        <form action={deleteTicketById}>
          <input type="hidden" name="id" value={params.ticketId} />
          <Button size="sm" variant="destructive" type="submit">
            Slett henvendelse
          </Button>
        </form>
      </div>
      <TicketViewForm ticket={ticket.data} />
    </>
  );
};

export default TicketViewPage;
