"use client";
import { createNewAnonymousTicket, createNewTicket } from "@/actions/ticket";
import { Button } from "@/components/catalyst/button";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Textarea } from "@/components/catalyst/textarea";
import { cn } from "@/lib/utils";
import { Priority } from "@prisma/client";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const NewTicketForm = ({ exerciseId }: { exerciseId: string }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [priority, setPriority] = useState<string>("LOW");
  const [content, setContent] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const ticket = await createNewAnonymousTicket(
      name,
      email,
      priority as Priority,
      content,
      exerciseId
    );
    setName("");
    setEmail("");
    setContent("");
    setPriority("LOW");

    toast({
      title: "Henvendelse opprettet",
      description: "Henvendelsen ble opprettet og sendt til support",
    });
  };

  return (
    <div className="mx-auto max-w-screen-lg flex flex-col gap-4 mt-6">
      <div>
        <Field>
          <Label>Tittel</Label>
          <Input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
      </div>
      <div>
        <Field>
          <Label>Epost</Label>
          <Input
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
      </div>
      <div>
        <Field>
          <Label>Prioritet</Label>
          <div className="grid grid-cols-3 mt-2 gap-4">
            <button
              className={cn(
                priority === "LOW" && "border-green-500",
                "py-2 text-center flex items-center justify-center gap-2 border rounded-md"
              )}
              onClick={() => setPriority("LOW")}
            >
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Lav
            </button>
            <button
              className={cn(
                priority === "MEDIUM" && "border-yellow-500",
                "py-2 text-center flex items-center justify-center gap-2 border rounded-md"
              )}
              onClick={() => setPriority("MEDIUM")}
            >
              <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
              Medium
            </button>
            <button
              className={cn(
                priority === "HIGH" && "border-red-500",
                "py-2 text-center flex items-center justify-center gap-2 border rounded-md"
              )}
              onClick={() => setPriority("HIGH")}
            >
              <span className="h-2 w-2 bg-red-500 rounded-full"></span>
              Høy
            </button>
          </div>
        </Field>
      </div>
      <div>
        <Field>
          <Label>Beskrivelse</Label>
          <Textarea
            required
            value={content}
            name="description"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Skriv en beskrivelse av henvendelsen her..."
            rows={4}
          />
        </Field>
      </div>
      <div>
        <Button
          className="w-full cursor-pointer"
          onClick={() => handleSubmit()}
        >
          Opprett henvendelse
        </Button>
      </div>
    </div>
  );
};

export default NewTicketForm;
