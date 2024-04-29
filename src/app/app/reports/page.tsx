import ReportGenerator from "@/components/report-generator";
import Pagetitle from "@/components/v2/pagetitle";

const ReportsPage = () => {
  return (
    <div className="">
      <Pagetitle backUrl="">Rapporter</Pagetitle>
      <ReportGenerator />
    </div>
  );
};

export default ReportsPage;
