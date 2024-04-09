import CreateOrLogin from "./forms/create-or-login";

const ExerciseBlock = () => {
  return (
    <div>
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
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
            <CreateOrLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseBlock;
