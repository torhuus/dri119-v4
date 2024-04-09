"use client";
import { useState } from "react";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import Filterbar from "./filterbar";
import { Token } from "@/actions/auth";
import { Button } from "../catalyst/button";
import { PlusIcon, TicketXIcon } from "lucide-react";

const statuses = {
  NEW: "text-green-700 bg-green-50 ring-green-600/20",
  IN_PROGRESS: "text-gray-600 bg-gray-50 ring-gray-500/10",
  CLOSED: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function TicketsList({
  tickets,
  token,
}: {
  tickets: Ticket[];
  token: Token;
}) {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);

  return (
    <>
      <div>
        <Filterbar
          setFilteredTickets={setFilteredTickets}
          tickets={tickets}
          token={token}
        />
      </div>
      {filteredTickets.length === 0 && (
        <div className="text-center mt-16">
          <TicketXIcon className="h-12 w-12 mx-auto" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Ingen henvendelser funnet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Endre på filteret eller opprett en ny henvendelse
          </p>
          <div className="mt-6">
            <Link href="/app/tickets/new">
              <Button
                type="button"
                className="inline-flex items-center rounded-md bg-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
              >
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Ny henvendelse
              </Button>
            </Link>
          </div>
        </div>
      )}
      <ul role="list" className="divide-y divide-gray-100">
        {filteredTickets.map((ticket: Ticket) => {
          let createdAt = new Date(ticket.createdAt).toDateString();
          return (
            <li key={ticket.id}>
              <Link
                href={"/app/tickets/" + ticket.id}
                className="flex items-center justify-between gap-x-6 py-5"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {ticket.title}
                    </p>
                    <p
                      className={classNames(
                        statuses[ticket.status],
                        "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                      )}
                    >
                      {ticket.status}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">Opprettet {createdAt}</p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="truncate">
                      Opprettet av {ticket.email || "Anonym"}
                    </p>
                  </div>
                  <div className="text-xs mt-2 capitalize bg-muted text-black rounded-md p-1 px-2 inline-block">
                    {ticket.area.toLowerCase()}
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <button className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                    Vis
                  </button>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
