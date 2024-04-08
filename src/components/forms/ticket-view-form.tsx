"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Area, Priority, Status } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createNewTicket, updateTicket } from "@/actions/ticket";
import { useToast } from "../ui/use-toast";
import TicketDetails from "../ticket-details";

const newTicketBySupportSchema = z.object({
  title: z.string().min(5, { message: "Tittelen må være minst 5 tegn" }),
  content: z.string().min(10, {
    message: "Gi en god og forklarende beskrivelse på henvendelsen din.",
  }),
  priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH]),
  area: z.enum([
    Area.SERVICESENTER,
    Area.ENDRINGSKONTROLL,
    Area.HENDELSESSTYRING,
    Area.PROBLEMSTYRING,
  ]),
  status: z.enum([Status.NEW, Status.CLOSED, Status.IN_PROGRESS]),
  internalNote: z.string().optional(),
});

const TicketViewForm = ({ ticket }: { ticket: any }) => {
  const supportForm = useForm<z.infer<typeof newTicketBySupportSchema>>({
    resolver: zodResolver(newTicketBySupportSchema),
    defaultValues: {
      title: ticket.title,
      content: ticket.content,
      priority: ticket.priority,
      area: ticket.area,
      status: ticket.status,
      internalNote: ticket.internalNote || "",
    },
  });

  return (
    <>
      <SupportForm form={supportForm} ticketId={ticket.id} />
      <div className="mb-8"></div>
      <TicketDetails ticket={ticket} />
    </>
  );
};

export default TicketViewForm;

const SupportForm = ({ form, ticketId }: { form: any; ticketId: string }) => {
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof newTicketBySupportSchema>) => {
    await updateTicket(values, ticketId);
    toast({
      title: "Henvendelse er oppdatert",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tittel</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tittel på henvendelsen din..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-20">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Prioritet</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="LOW" />
                        </FormControl>
                        <FormLabel className="font-normal">Lav</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MEDIUM" />
                        </FormControl>
                        <FormLabel className="font-normal">Medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HIGH" />
                        </FormControl>
                        <FormLabel className="font-normal">Høy</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NEW" />
                        </FormControl>
                        <FormLabel className="font-normal">Ny</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="IN_PROGRESS" />
                        </FormControl>
                        <FormLabel className="font-normal">Pågår</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="CLOSED" />
                        </FormControl>
                        <FormLabel className="font-normal">Lukket</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Praksis</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg praksis..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(Area).map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beskrivelse</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Beskriv henvendelsen din så godt som mulig..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="internalNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intern kommentar</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Om ønskelig kan interna kommentarer legges til her, disse vil ikke bli sett av brukeren som har sendt inn henvendelsen..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Button type="reset" onClick={form.reset} variant="outline">
              Angre
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Oppdater
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
