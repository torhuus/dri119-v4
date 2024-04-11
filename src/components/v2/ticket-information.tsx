import { Ticket } from "@prisma/client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
require("moment/locale/nb");

const TicketInformation = ({ ticket }: { ticket: Ticket }) => {
  moment.locale("nb");

  if (!ticket) return null;

  return (
    <div className="grow">
      <div>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Ticket ID: <span className="font-semibold">#{ticket?.id}</span>
              </CardTitle>
              <CardDescription>
                Opprettet{" "}
                {moment(new Date(ticket.createdAt)).format("DD/MM/YYYY HH:mm")}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Dato og tid</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Opprettet</span>
                  <span>
                    {moment(new Date(ticket.createdAt)).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sist oppdatert</span>
                  <span>
                    {moment(new Date(ticket.updatedAt)).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </span>
                </li>

                {ticket.startedAt && (
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Startet</span>
                    <span>
                      {moment(new Date(ticket.startedAt)).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </span>
                  </li>
                )}
                {ticket.closedAt && (
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lukket</span>
                    <span>
                      {moment(new Date(ticket.closedAt)).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </span>
                  </li>
                )}
              </ul>
              {ticket.startedAt || ticket.closedAt ? (
                <Separator className="my-2" />
              ) : null}
              <ul className="grid gap-3">
                {ticket.startedAt && ticket.closedAt && (
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Tid brukt (startet - lukket)
                    </span>
                    <span>
                      {moment
                        .duration(
                          moment(ticket.closedAt).diff(ticket.startedAt)
                        )
                        .humanize()}
                    </span>
                  </li>
                )}
                {ticket.startedAt && (
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Tid til påbegynt
                    </span>
                    <span>
                      {moment
                        .duration(
                          moment(ticket.startedAt).diff(ticket.createdAt)
                        )
                        .humanize()}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Innsender</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Epost/br.navn</dt>
                  <dd>{ticket.email ? ticket.email : "Anonym"}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TicketInformation;
