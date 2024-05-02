import { Token, getToken } from "@/actions/auth";
import ReportGenerator from "@/components/report-generator";
import Pagetitle from "@/components/v2/pagetitle";

const ReportsPage = async () => {
  const token = (await getToken()) as Token;
  return (
    <div className="">
      <Pagetitle backUrl="">Rapporter</Pagetitle>
      <ReportGenerator token={token} />
    </div>
  );
};

export default ReportsPage;
