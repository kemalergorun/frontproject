import { getLessonPrograms } from "@/actions/lesson-program/get-lesson-programs.action";
import PageTitle from "@/components/common/PageTitle";
import TeacherForm from "@/components/forms/TeacherForm";
import { extractLessonPrograms } from "@/utils/functions/extract-lesson-programs";

export default async function NewTeacherPage() {
  const data = await getLessonPrograms();

  const isDataAvailable =
    data && data.status !== "error" && Array.isArray(data) && data?.length;

  console.log(data);

  const processedData = isDataAvailable ? data : [];

  return (
    <>
      <PageTitle title="Create New Teacher" />
      <TeacherForm data={processedData} />
    </>
  );
}
