import { Ticket } from "@prisma/client";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import moment from "moment";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn, createPriorityBadge, translateStatus } from "@/lib/utils";

const TicketCard = ({ ticket }: { ticket: any }) => {
  const { label, badgeColor } = createPriorityBadge(ticket.priority);
  let newMoment = moment;
  newMoment.locale("nb");
  const status = translateStatus(ticket.status);
  const ticketContent =
    ticket.content.length > 100
      ? ticket.content.slice(0, 100) + "..."
      : ticket.content;
  const lastUpdated = newMoment(ticket.updatedAt).fromNow();

  return (
    <Link href={`/app/tickets/${ticket.id}`}>
      <Card
        className={cn(
          ticket.status === "CLOSED" && "grayscale",
          "bg-muted relative flex items-center"
        )}
      >
        <div className="px-4 py-3 grow relative overflow-hidden">
          <div
            className={cn(
              ticket.status === "NEW"
                ? "bg-blue-500"
                : ticket.status === "CLOSED"
                ? "bg-gray-500"
                : "bg-yellow-500",
              "h-full w-1 absolute left-0 top-0 overflow-hidden rounded-tl-md rounded-bl-md"
            )}
          ></div>
          <CardHeader className="p-0 mb-3">
            <Badge className="rounded-md w-fit">{status}</Badge>
            <h2 className="text-lg font-medium">{ticket.title}</h2>
          </CardHeader>
          <div className="flex flex-col gap-2">
            <p>{ticketContent}</p>
            <small>Oppdatert: {lastUpdated}</small>
          </div>
          <CardFooter className="p-0 mt-4 flex gap-2 items-center">
            <Badge variant="outline" className={cn(badgeColor, "rounded-md")}>
              {label}
            </Badge>
            <Badge variant="outline" className="rounded-md">
              ID: {ticket.id}
            </Badge>
            <Badge className="rounded-md bg-slate-600">{ticket.area}</Badge>
          </CardFooter>
        </div>
        <div className="pr-4">
          <ChevronRight className="h-6 w-6" />
        </div>
      </Card>
    </Link>
  );
};

export default TicketCard;
