"use client";
import { Exercise } from "@prisma/client";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Select } from "@/components/catalyst/select";
import { Input } from "../catalyst/input";
import { Switch, SwitchField } from "../catalyst/switch";
import { useState } from "react";
import { Button } from "../catalyst/button";
import { getTimeAgo } from "@/lib/utils";
import { createExercise } from "@/actions/exercise";
import { useRouter } from "next/navigation";
import { setExerciseCookie } from "@/actions/auth";

const CreateOrLoginForm = ({
  existingExercises,
}: {
  existingExercises: any;
}) => {
  const [name, setName] = useState<string>("");
  const [demoContent, setDemoContent] = useState<boolean>(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = async () => {
    if (name !== "") {
      // Create new exercise
      const exercise = await createExercise(
        name,
        demoContent === true ? "true" : "false"
      );
      if (exercise.error) {
        console.log("Error creating exercise");
        return;
      }
      router.push("/v2");
    } else if (selectedExerciseId !== "") {
      // Use existing exercise
      await setExerciseCookie(selectedExerciseId);
      router.push("/v2");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="new-exercise">
        <div className="flex flex-col gap-4 text-left">
          <Field>
            <Label htmlFor="name">Navn på øvelse</Label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              disabled={selectedExerciseId !== ""}
              onChange={(e: any) => setName(e.target.value)}
            />
          </Field>
          <SwitchField>
            <Label className={"font-medium"}>Importer demo-innhold?</Label>
            <Switch
              disabled={selectedExerciseId !== "" && name === ""}
              name="demoContent"
              checked={demoContent}
              onChange={(e: any) => setDemoContent(!demoContent)}
            />
          </SwitchField>
        </div>
      </div>
      <div className="w-full text-center">
        <span className="text-muted-foreground text-center">eller</span>
      </div>
      <div className="existing-exercises">
        <Field>
          <Label htmlFor="existingExercises">Eksisterende øvelser</Label>
          <Select
            name="existingExercises"
            defaultValue="none"
            onChange={(e) => {
              setName("");
              setDemoContent(false);
              setSelectedExerciseId(e.target.value);
            }}
          >
            <option value="">Velg en eksisterende øvelse...</option>
            {existingExercises.map((exercise: Exercise) => (
              <option
                className="text-gray-400"
                key={exercise.id}
                value={exercise.id}
              >
                {exercise.name} - {exercise.id.slice(0, 8)}... (
                {getTimeAgo(exercise.createdAt)})
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div>
        <Button
          className="w-full mx-auto "
          type="submit"
          disabled={name === "" && selectedExerciseId === ""}
          onClick={() => handleFormSubmit()}
        >
          Fortsett
        </Button>
      </div>
    </div>
  );
};

export default CreateOrLoginForm;
