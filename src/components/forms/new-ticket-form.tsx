"use client";
import { Token } from "@/actions/auth";
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
import { createNewTicket } from "@/actions/ticket";
import { useToast } from "../ui/use-toast";

const newTicketByUserSchema = z.object({
  title: z.string().min(5, { message: "Tittelen må være minst 5 tegn" }),
  content: z.string().min(10, {
    message: "Gi en god og forklarende beskrivelse på henvendelsen din.",
  }),
  priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH]),
});

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

const NewTicketForm = ({ token }: { token: Token }) => {
  const userForm = useForm<z.infer<typeof newTicketByUserSchema>>({
    resolver: zodResolver(newTicketByUserSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: Priority.LOW,
    },
  });

  const supportForm = useForm<z.infer<typeof newTicketBySupportSchema>>({
    resolver: zodResolver(newTicketBySupportSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: Priority.LOW,
      area: Area.SERVICESENTER,
      status: Status.NEW,
      internalNote: "",
    },
  });

  if (token.role === "USER") {
    return <UserForm form={userForm} />;
  } else if (token.role === "SUPPORT") {
    return <SupportForm form={supportForm} />;
  }
};

export default NewTicketForm;

const UserForm = ({ form }: { form: any }) => {
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof newTicketByUserSchema>) => {
    await createNewTicket(values);
    form.reset();
    toast({
      title: "Henvendelse sendt",
      description:
        "Henvendelsen din er sendt inn, har du flere spørsmål eller henvendelser kan du sende inn flere.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tittel</FormLabel>
              <FormControl>
                <Input placeholder="Tittel på henvendelsen din..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

const SupportForm = ({ form }: { form: any }) => {
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof newTicketBySupportSchema>) => {
    // Send ticket to backend, show a toast and redirect to /app/tickets
    await createNewTicket(values);
    form.reset();
    toast({
      title: "Henvendelse er sendt",
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tittel</FormLabel>
              <FormControl>
                <Input placeholder="Tittel på henvendelsen din..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Praksis</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Send
        </Button>
      </form>
    </Form>
  );
};
