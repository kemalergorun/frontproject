import NoDataAvailable from "../common/NoDataAvailable";
import { PieChart } from "../charts/PieChart";
import { getStudentInformationByPageAsAdmin } from "@/actions/student-information/get-student-information-by-page-as-admin.action";
import { ScatterChart } from "../charts/ScatterChart";

export default async function PerformanceScatterLoader() {
  const data = await getStudentInformationByPageAsAdmin({ size: 1000 });

  const isDataAvailable =
    data && data.status !== "error" && data?.content?.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;

  const scatterData = data?.content?.map((item) => ({
    x: item?.absentee,
    y: item?.average,
  }));

  return (
    <ScatterChart
      backgroundColor="#80deea"
      data={scatterData}
      label="Student Performance"
      xLabel="Absenteeism"
      yLabel="Average Score (%)"
    />
  );
}
