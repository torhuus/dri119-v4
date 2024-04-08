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
import { useToast } from "../ui/use-toast";
import { createUser } from "@/actions/auth";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getAllUsersByExerciseId } from "@/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getTimeAgo } from "@/lib/utils";

const createUserFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      "Brukernavnet kan kun inneholde bokstaver, tall, bindestrek og understrek",
  }),
});

export default function CreateUserForm({
  setUserId,
  exerciseId,
}: {
  setUserId: (id: string) => void;
  exerciseId: string;
}) {
  const form = useForm<z.infer<typeof createUserFormSchema>>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();
  const [existingUsers, setExistingUsers] = useState<User[] | undefined>([]);
  const [existingUserId, setExistingUserId] = useState<string>("");

  useEffect(() => {
    const getExercises = async () => {
      const users = await getAllUsersByExerciseId(exerciseId);
      setExistingUsers(users.data);
    };
    getExercises();
  }, []);

  async function onSubmit(values: z.infer<typeof createUserFormSchema>) {
    // Alle verdiene i skjemaet er validert og kan brukes trygt, og skal sendes til db via prisma
    const result = await createUser(values.name, exerciseId);
    if (result.error) {
      console.error(result.error);
      toast({
        title: "Noe gikk galt",
        description: "Kunne ikke opprette bruker",
      });
    } else if (result.data) {
      toast({
        title: "Bruker opprettet",
        description: `Brukeren "${values.name}" ble opprettet`,
      });
      setUserId(result.data.id);
    }
  }
  return (
    <Tabs defaultValue="new">
      <TabsList className="flex w-full">
        <TabsTrigger className="grow" value="new">
          Ny bruker
        </TabsTrigger>
        <TabsTrigger className="grow" value="existing">
          Eksisterende brukere
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
                  <FormLabel>Navn på bruker</FormLabel>
                  <FormControl>
                    <Input placeholder="Brukernavn..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Oppretter..." : "Opprett bruker"}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="existing">
        <div className="flex flex-col">
          <Select
            name="exerciseId"
            onValueChange={(value) => setExistingUserId(value)}
          >
            <SelectTrigger name="exerciseId" id="exerciseId" className="w-full">
              <SelectValue placeholder="Eksisterende øvelse" />
            </SelectTrigger>
            <SelectContent>
              {existingUsers &&
                existingUsers.length > 0 &&
                existingUsers.map((user) => {
                  return (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} -{" "}
                      <span className="text-gray-400">
                        {user.id.slice(0, 8)}... ({getTimeAgo(user.createdAt)})
                      </span>
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <Button onClick={() => setUserId(existingUserId)} className="mt-4">
            Bruk eksisterende bruker
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
