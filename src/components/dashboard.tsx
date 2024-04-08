import { Token } from "@/actions/auth";
import DashboardStats from "./dashboard-stats";
import { Suspense } from "react";

const Dashboard = ({ token }: { token: Token }) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardStats />
      </Suspense>
    </>
  );
};

export default Dashboard;
