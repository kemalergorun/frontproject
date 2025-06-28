import { getMeetingsAsStudent } from "@/actions/meeting/get-meeting-as-student.action";
import MeetingCard from "../cards/MeetingCard";
import NoDataAvailable from "../common/NoDataAvailable";

export default async function MeetingNoticeLoader() {
  const data = await getMeetingsAsStudent();

  const isDataAvailable =
    data && data.status !== "error" && Array.isArray(data) && data?.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;

  return (
    <>
      {data.map((item, index) => (
        <MeetingCard key={index} data={item} />
      ))}
    </>
  );
}
