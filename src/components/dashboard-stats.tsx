import { getDashboardStats } from "@/actions/dashboard";

const DashboardStats = async () => {
  const { totalTickets, statusCounts, areaCounts, priorityCounts } =
    await getDashboardStats();

  const isEmpty = totalTickets <= 0 ? true : false;

  if (isEmpty) {
    return (
      <div className="mt-6">
        <p className="text-center">Ingen henvendelser enda</p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div>
        <div className="text-center">
          <h2 className="text-7xl font-bold">{totalTickets}</h2>
          <span className="">Totalt antall henvendelser</span>
        </div>
        <h2 className="my-6 mb-4 text-xl font-semibold">Status</h2>
        <ul className="grid grid-cols-2 gap-4">
          {statusCounts.map((status) => (
            <li key={status.status}>
              <Link href={`/app/tickets?status=${status.status}`}>
                <StatsCard
                  label={translateStatus(status.status)}
                  value={status._count}
                />
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="my-6 mb-4 text-xl font-semibold">Praksis</h2>
        <ul className="grid grid-cols-2 gap-4">
          {areaCounts.map((area) => (
            <Link key={area.area} href={`/app/tickets?area=${area.area}`}>
              <li>
                <StatsCard label={area.area} value={area._count} />
              </li>
            </Link>
          ))}
        </ul>
        <h2 className="my-6 mb-4 text-xl font-semibold">Prioritert</h2>
        <ul className="grid grid-cols-2 gap-4">
          {priorityCounts.map((priority) => (
            <Link
              key={priority.priority}
              href={`/app/tickets?priority=${priority.priority}`}
            >
              <li>
                <StatsCard
                  label={createPriorityBadge(priority.priority).label}
                  value={priority._count}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DashboardStats;

import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPriorityBadge, translateStatus } from "@/lib/utils";
import Link from "next/link";

const StatsCard = ({ label, value }: any) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {label.toLocaleLowerCase()}
        </CardTitle>
        {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
};
