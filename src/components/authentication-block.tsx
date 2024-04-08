"use client";

import { useState } from "react";
import CreateExerciseForm from "./forms/create-exercise-form";
import CreateUserForm from "./forms/create-user-form";
import { Button } from "./ui/button";
import { signin } from "@/actions/auth";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function AuthenticationBlock() {
  const [exerciseId, setExerciseId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSignin = async () => {
    const data = await signin(userId, exerciseId);
    if (data.status === 200) {
      router.push("/app");
    } else if (data.error) {
      toast({
        title: "Noe gikk galt",
        description: "Kunne ikke logge inn",
      });
    }
  };

  return (
    <div className="mt-20 px-4">
      {exerciseId === "" && (
        <CreateExerciseForm setExerciseId={setExerciseId} />
      )}
      {userId === "" && exerciseId !== "" && (
        <CreateUserForm setUserId={setUserId} exerciseId={exerciseId} />
      )}

      {exerciseId !== "" && userId !== "" && (
        <Button onClick={async () => handleSignin()}>Logg inn</Button>
      )}
    </div>
  );
}
