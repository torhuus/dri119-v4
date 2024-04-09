import { Token, getToken } from "@/actions/auth";
import NewAuthenticatedTicketForm from "@/components/forms/auth-new-ticket-tw";
import Pagetitle from "@/components/v2/pagetitle";

const NewTicketPage = async () => {
  const token = (await getToken()) as Token;
  return (
    <>
      <Pagetitle backUrl="/app/tickets">Ny henvendelse</Pagetitle>
      <NewAuthenticatedTicketForm exerciseId={token.exerciseId} />
    </>
  );
};

export default NewTicketPage;
