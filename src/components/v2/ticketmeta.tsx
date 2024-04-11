"use client";
import { Area, Status, Ticket } from "@prisma/client";
import { Field, Label } from "../catalyst/fieldset";
import { Input } from "../catalyst/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Select } from "../catalyst/select";
import { Textarea } from "../catalyst/textarea";
import { Button } from "../catalyst/button";
import { deleteTicketById, updateTicket } from "@/actions/ticket";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const TicketMeta = ({ ticket }: { ticket: Ticket }) => {
  const [title, setTitle] = useState<string>(ticket.title);
  const [content, setContent] = useState<string>(ticket.content);
  const [status, setStatus] = useState<string>(ticket.status);
  const [priority, setPriority] = useState<string>(ticket.priority);
  const [area, setArea] = useState<string>(ticket.area);
  const [internalNote, setInternalNote] = useState<string>(
    ticket.internalNote || ""
  );

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    // opppdater henvendelse
    const updatedTicket = await updateTicket(
      {
        title,
        content,
        status,
        priority,
        area,
        internalNote,
      },
      ticket.id,
      ticket
    );

    toast({
      title: "Oppdatert!",
      description: "Henvendelsen ble oppdatert",
    });
  };

  const handleDelete = async () => {
    // slett henvendelse
    await deleteTicketById(ticket.id);
    toast({
      title: "Slettet!",
      description: "Henvendelsen ble slettet",
    });
    router.push("/app/tickets");
  };

  return (
    <div className="grow">
      <div className="flex flex-col gap-4">
        <div>
          <Field>
            <Label>Tittel</Label>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={status}
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
            <Select
              defaultValue={area}
              onChange={(e) => setArea(e.target.value as Area)}
              name="area"
            >
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
        <div className="flex gap-4">
          <Button color="red" className="w-full" onClick={() => handleDelete()}>
            Slett henvendelse
          </Button>
          <Button className="w-full" onClick={() => handleSubmit()}>
            Oppdater henvendelse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketMeta;
