"use client";
import {
  createNewAnonymousTicket,
  createNewAuthenticatedTicket,
  createNewTicket,
} from "@/actions/ticket";
import { Button } from "@/components/catalyst/button";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Textarea } from "@/components/catalyst/textarea";
import { cn } from "@/lib/utils";
import { Area, Priority, Status } from "@prisma/client";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Select } from "../catalyst/select";

const ViewAndUpdateTicket = ({ exerciseId }: { exerciseId: string }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.NEW);
  const [area, setArea] = useState<Area>(Area.SERVICESENTER);
  const [internalNote, setInternalNote] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (name === "" || content === "" || email === "") {
      toast({
        title: "Mangler tittel eller beskrivelse",
        description: "Vennligst fyll ut tittel og beskrivelse",
      });
      return;
    }
    const ticket = await createNewAuthenticatedTicket(
      name,
      email,
      priority as Priority,
      content,
      area as Area,
      status as Status,
      internalNote,
      exerciseId
    );
    setName("");
    setEmail("");
    setContent("");
    setPriority("LOW");
    setStatus("NEW");
    setArea(Area.SERVICESENTER);
    setInternalNote("");

    toast({
      title: "Opprettet!",
      description: "Henvendelsen ble opprettet",
    });
  };

  return (
    <div className="w-full mx-auto max-w-screen-lg flex flex-col gap-4 mt-6">
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
          <Label>Epost (ikke nødvendig)</Label>
          <Input
            name="email"
            type="email"
            placeholder="Epostadresse til innsender"
            value={email}
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
          <Label>Status</Label>
          <Select
            onChange={(e) => setStatus(e.target.value as Status)}
            name="status"
          >
            {Object.keys(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div>
        <Field>
          <Label>Praksis</Label>
          <Select onChange={(e) => setArea(e.target.value as Area)} name="area">
            {Object.keys(Area).map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Select>
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
        <Field>
          <Label>Intern kommentar</Label>
          <Textarea
            required
            value={internalNote}
            name="internalNote"
            onChange={(e) => setInternalNote(e.target.value)}
            placeholder="Det som skrives her vil ikke være synlig for innsender"
            rows={4}
          />
        </Field>
      </div>
      <div>
        <Button className="w-full" onClick={() => handleSubmit()}>
          Opprett henvendelse
        </Button>
      </div>
    </div>
  );
};

export default ViewAndUpdateTicket;
