"use client";
import { User } from "@prisma/client";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Select } from "@/components/catalyst/select";
import { Input } from "../catalyst/input";
import { useState } from "react";
import { Button } from "../catalyst/button";
import { getTimeAgo } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createUser, signin } from "@/actions/auth";

const CreateOrLoginUserForm = ({
  existingUsers,
  exerciseId,
}: {
  existingUsers: any;
  exerciseId: string;
}) => {
  const [name, setName] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = async () => {
    if (name !== "") {
      // Create new exercise
      const user = await createUser(name, exerciseId);
      if (user.error) {
        console.log("Error creating exercise");
        return;
      }
      await signin(user.data?.id as string, exerciseId);
      router.push("/app");
    } else if (selectedUser !== "") {
      // Use existing exercise
      await signin(selectedUser, exerciseId);
      router.push("/v2");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="new-exercise">
        <div className="flex flex-col gap-4 text-left">
          <Field>
            <Label htmlFor="name">Navn på bruker</Label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              disabled={selectedUser !== ""}
              onChange={(e: any) => setName(e.target.value)}
            />
          </Field>
        </div>
      </div>
      <div className="w-full text-center">
        <span className="text-muted-foreground text-center">eller</span>
      </div>
      <div className="existing-exercises">
        <Field>
          <Label htmlFor="existingExercises">Eksisterende bruker</Label>
          <Select
            name="existingExercises"
            defaultValue="none"
            onChange={(e) => {
              setName("");
              setSelectedUser(e.target.value);
            }}
          >
            <option value="">Velg en eksisterende øvelse...</option>
            {existingUsers &&
              existingUsers.length > 0 &&
              existingUsers.map((user: User) => (
                <option className="text-gray-400" key={user.id} value={user.id}>
                  {user.name} - {user.id.slice(0, 8)}... (
                  {getTimeAgo(user.createdAt)})
                </option>
              ))}
          </Select>
        </Field>
      </div>
      <div>
        <Button
          className="w-full mx-auto "
          type="submit"
          disabled={name === "" && selectedUser === ""}
          onClick={() => handleFormSubmit()}
        >
          Fortsett
        </Button>
      </div>
    </div>
  );
};

export default CreateOrLoginUserForm;
