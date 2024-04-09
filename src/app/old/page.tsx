import { Token, getToken } from "@/actions/auth";
import Dashboard from "@/components/dashboard";
import NewTicketForm from "@/components/forms/new-ticket-form";

const AppPage = async () => {
  const token = (await getToken()) as Token;

  if (token.role === "USER") {
    return (
      <>
        <div className="my-6">
          <h1 className="text-xl font-semibold">Send inn henvendelse</h1>
        </div>
        <NewTicketForm token={token} />
      </>
    );
  } else {
    return (
      <>
        <Dashboard token={token} />
      </>
    );
  }
};

export default AppPage;
