import NoDataAvailable from "../common/NoDataAvailable";
import { BarChart } from "../charts/BarChart";
import { getMeetingsByPage } from "@/actions/meeting/get-meetings-by-page.action";
import { getMessagesByPage } from "@/actions/message/get-messages-by-page.action";
import { aggregateMessagesByDate } from "@/utils/functions/aggregate-messages-by-date";
import { LineChart } from "../charts/LineChart";

export default async function TimeSeriesChart({ role }) {
  const data =
    role === "TEACHER"
      ? await getMeetingsByPage({ size: 1000 })
      : await getMessagesByPage({ sie: 1000 });

  const isDataAvailable =
    data && data.status !== "error" && data?.content?.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;

  const dataContent = data?.content;

  const aggregateData = aggregateMessagesByDate(dataContent);

  return (
    <LineChart
      borderColor="#006d75"
      data={aggregateData.map((item) => item[1])}
      label={`Number of ${role === "TEACHER" ? "Meetings" : "Messages"}`}
      labels={aggregateData.map((item) => item[0])}
    />
  );
}
