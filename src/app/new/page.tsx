import NewTicketForm from "@/components/forms/unauth-new-ticket";
import Pagetitle from "@/components/v2/pagetitle";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewTicketPage = () => {
  const exerciseId = cookies().get("exerciseId")?.value;

  if (!exerciseId) {
    redirect("/");
  }

  return (
    <>
      <header className="flex px-4 justify-between items-center border-b py-4 mb-4 font-medium">
        <Link href="/v2">&larr; Tilbake</Link>
        <Link href="/login">Logg inn &rarr;</Link>
      </header>
      <Pagetitle backUrl="">Ny henvendelse</Pagetitle>
      <NewTicketForm exerciseId={exerciseId} />;
    </>
  );
};

export default NewTicketPage;
