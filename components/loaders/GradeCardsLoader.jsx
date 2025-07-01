import GradeCard from "../cards/GradeCard";
import NoDataAvailable from "../common/NoDataAvailable";
import { getStudentInformationAsStudent } from "@/actions/student-information/get-student-information-as-student.action";

export default async function GradeCardsLoader() {
  const data = await getStudentInformationAsStudent(0, 2);

  const isDataAvailable =
    data &&
    data.status !== "error" &&
    Array.isArray(data?.content) &&
    data?.content?.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;



  return (
    <>
      {data.content.map((item, index) => (
        <GradeCard key={index} data={item} />
      ))}
    </>
  );
}
