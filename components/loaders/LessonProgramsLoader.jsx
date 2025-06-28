import { getLessonProgramAsStudent } from "@/actions/lesson-program/get-lesson-program-as-student.action";
import NoDataAvailable from "../common/NoDataAvailable";
import Avatar from "../common/Avatar";
import LessonProgramCard from "../cards/LessonProgramCard";

export default async function LessonProgramsLoader() {
  const data = await getLessonProgramAsStudent();

  const isDataAvailable =
    data && data.status !== "error" && Array.isArray(data) && data?.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;

  return data
    .splice(0, 4)
    .map((lessonProgram, index) => (
      <LessonProgramCard key={index} data={lessonProgram} />
    ));
}
