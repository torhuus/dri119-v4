"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createExercise, getAllExercises } from "@/actions/exercise";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Exercise } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getTimeAgo } from "@/lib/utils";
import { Switch } from "../ui/switch";

const createExerciseFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      "Navnet på øvelsen kan kun inneholde bokstaver, tall, bindestrek og understrek",
  }),
  demoContent: z.boolean().optional().default(false),
});

export default function CreateExerciseForm({
  setExerciseId,
}: {
  setExerciseId: any;
}) {
  const form = useForm<z.infer<typeof createExerciseFormSchema>>({
    resolver: zodResolver(createExerciseFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { toast } = useToast();
  const [existingExercises, setExistingExercises] = useState<
    Exercise[] | undefined
  >([]);
  const [existingExerciseId, setExistingExerciseId] = useState<string>("");

  useEffect(() => {
    const getExercises = async () => {
      const exercises = await getAllExercises();
      setExistingExercises(exercises.data);
    };
    getExercises();
  }, []);

  async function onSubmit(values: z.infer<typeof createExerciseFormSchema>) {
    // Alle verdiene i skjemaet er validert og kan brukes trygt, og skal sendes til db via prisma
    const result = await createExercise(values.name, values.demoContent);
    if (result.error) {
      console.error(result.error);
      toast({
        title: "Noe gikk galt",
        description: "Kunne ikke opprette øvelsen",
      });
    } else if (result.data) {
      toast({
        title: "Øvelse opprettet",
        description: `Øvelsen "${values.name}" ble opprettet`,
      });
      setExerciseId(result.data.id);
    }
  }

  return (
    <Tabs defaultValue="new">
      <TabsList className="flex w-full">
        <TabsTrigger className="grow" value="new">
          Ny øvelse
        </TabsTrigger>
        <TabsTrigger className="grow" value="existing">
          Eksisterende øvelser
        </TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn på øvelse</FormLabel>
                  <FormControl>
                    <Input placeholder="Navn på øvelse..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demoContent"
              render={({ field }) => (
                <FormItem className=" mt-2 flex flex-row-reverse gap-4 items-center justify-end">
                  <FormLabel className="mt-2">
                    Ønsker du demo-innhold?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      className=""
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Oppretter..." : "Opprett øvelse"}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="existing">
        <div className="flex flex-col">
          <Select
            name="exerciseId"
            onValueChange={(value) => setExistingExerciseId(value)}
          >
            <SelectTrigger name="exerciseId" id="exerciseId" className="w-full">
              <SelectValue placeholder="Eksisterende øvelse" />
            </SelectTrigger>
            <SelectContent>
              {existingExercises &&
                existingExercises.length > 0 &&
                existingExercises.map((exercise) => {
                  return (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name} -{" "}
                      <span className="text-gray-400">
                        {exercise.id.slice(0, 8)}... (
                        {getTimeAgo(exercise.createdAt)})
                      </span>
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <Button
            onClick={() => setExerciseId(existingExerciseId)}
            className="mt-4"
          >
            Bruk eksisterende øvelse
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
