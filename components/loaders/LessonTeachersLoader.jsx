import { getLessonProgramAsStudent } from "@/actions/lesson-program/get-lesson-program-as-student.action";
import NoDataAvailable from "../common/NoDataAvailable";
import { convertDataIntoTeachers } from "@/utils/functions/convert-data-into-teachers";
import Avatar from "../common/Avatar";

export default async function LessonTeachersLoader() {
  const data = await getLessonProgramAsStudent();

  console.log(data);

  const isDataAvailable =
    data && data.status !== "error" && Array.isArray(data) && data?.length > 0;

  if (!isDataAvailable) return <NoDataAvailable />;

  const processedData = convertDataIntoTeachers(data);

  console.log(processedData);

  return processedData
    .splice(0, 3)
    .map((teacher, index) => (
      <Avatar
        key={index}
        height={125}
        width={125}
        src={teacher?.profilePicture}
        title={`${teacher.name} ${teacher.surname}`}
        rounded
      />
    ));
}
