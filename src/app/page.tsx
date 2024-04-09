import AuthenticationBlock from "@/components/authentication-block";
import CreateOrLogin from "@/components/forms/create-or-login";

const LandingPage = () => {
  return (
    <div className="max-w-md mx-auto px-4">
      <div className="text-center my-12">
        <h2 className="text-3xl font-medium">Opprett eller logg inn</h2>
      </div>
      <CreateOrLogin />
    </div>
  );
};

export default LandingPage;
