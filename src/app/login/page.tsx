import { getAllUsersByExerciseId } from "@/actions/user";
import Authentication from "@/components/authentication-tw";
import CreateOrLoginUserForm from "@/components/forms/col-form-user";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const TailwindLoginPage = async () => {
  const exerciseId = cookies().get("exerciseId")?.value;
  if (!exerciseId) {
    redirect("/");
  }
  const existingUsers = await getAllUsersByExerciseId(exerciseId);

  return (
    <>
      <header className="flex px-4 justify-between items-center border-b py-4 mb-4 font-medium">
        <Link href="/">&larr; Velg øvelse</Link>
        <Link href="/new">+ Ny henvendelse</Link>
      </header>
      <div className="max-w-md mx-auto px-4">
        <div className="my-6">
          <h2 className="text-2xl font-semibold">
            Opprett bruker eller logg inn
          </h2>
        </div>
        <CreateOrLoginUserForm
          exerciseId={exerciseId}
          existingUsers={existingUsers}
        />
      </div>
    </>
  );
};

export default TailwindLoginPage;
