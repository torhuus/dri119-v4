import Link from "next/link";

const TailwindLandingPage = () => {
  return (
    <div>
      <div className="px-6 py-12 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Registrer og adminstrer henvendelser
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Du kan opprette ny henvendelser ved å klikke på knappen under, eller
            logge inn som en support-arbeider for å administrere eksisterende
            henvendelser.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/new"
              className="rounded-md bg-neutral-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
            >
              Opprett ny henvendelse
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logg inn <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindLandingPage;
