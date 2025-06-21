import { getLessons } from "@/actions/lesson/get-lessons.action";
import NoDataAvailable from "../common/NoDataAvailable";
import { BarChart } from "../charts/BarChart";

export default async function CreditScoreLoader() {
  const data = await getLessons();
  console.log(data);
  const isDataAvailable = data && data.status !== "error" && data.length > 0;

  console.log(isDataAvailable);
  if (!isDataAvailable) return <NoDataAvailable />;

  return (
    <BarChart
      backgroundColor="#0097a7"
      data={data.map((item) => item?.creditScore)}
      label="Credit Score"
      labels={data.map((item) => item?.lessonName)}
    />
  );
}
