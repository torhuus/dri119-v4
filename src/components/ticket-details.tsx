import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@prisma/client";
import moment from "moment";

export default function TicketDetails({ ticket }: { ticket: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Ticket ID: {ticket.id}
          </CardTitle>
          <CardDescription>
            Opprettet: {moment(ticket.createdAt).format("DD.MM.YYYY HH:mm")}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1"></div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Dato og tid</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Opprettet</span>
              <span>{moment(ticket.createdAt).format("DD.MM.YYYY HH:mm")}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Sist oppdatert</span>
              <span>{moment(ticket.updatedAt).format("DD.MM.YYYY HH:mm")}</span>
            </li>
            {ticket.startedAt && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Startet</span>
                <span>
                  {moment(ticket.startedAt).format("DD.MM.YYYY HH:mm")}
                </span>
              </li>
            )}
            {ticket.closedAt && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Lukket</span>
                <span>
                  {moment(ticket.closedAt).format("DD.MM.YYYY HH:mm")}
                </span>
              </li>
            )}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Opprettet av</span>
              <span>{ticket.User.name}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Annet</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd>{ticket.status}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Praksis</dt>
              <dd>{ticket.area}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Priority</dt>
              <dd>{ticket.priority}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3"></CardFooter>
      <div className="text-xs text-muted-foreground"></div>
    </Card>
  );
}
