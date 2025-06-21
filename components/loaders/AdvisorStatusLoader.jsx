import { getLessons } from "@/actions/lesson/get-lessons.action";
import NoDataAvailable from "../common/NoDataAvailable";
import { BarChart } from "../charts/BarChart";
import { getTeachers } from "@/actions/teacher/get-teachers.action";
import { calculateTeacherDemographics } from "@/utils/functions/calculate-teacher-demographics";
import { PieChart } from "../charts/PieChart";

export default async function AdvisorStatusLoader() {
  const data = await getTeachers();
  const isDataAvailable = data && data.status !== "error" && data.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;

  const teachers = calculateTeacherDemographics(data);

  return (
    <PieChart
      backgroundColor={["#b2ebf2", "#006d75"]}
      chartData={[
        teachers?.advisorStatus?.advisor,
        teachers?.advisorStatus?.nonAdvisor,
      ]}
      labels={["Advisor", "Non-Advisor"]}
    />
  );
}
