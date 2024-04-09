import { Token, getToken } from "@/actions/auth";
import NewTicketForm from "@/components/forms/new-ticket-form";
import { ArrowBigLeft, ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const NewTicketPage = async () => {
  const token = (await getToken()) as Token;

  return (
    <>
      <div className="mt-8">
        <Link href={"/app/tickets"} className="flex gap-2 items-center mb-6">
          <ArrowLeftCircle className="h-8 w-8" />
          <span className="text-lg font-semibold">Tilbake</span>
        </Link>
      </div>
      <NewTicketForm token={token} />
    </>
  );
};

export default NewTicketPage;
