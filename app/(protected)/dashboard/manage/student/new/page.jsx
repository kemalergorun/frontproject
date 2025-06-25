import { getAdvisorTeachers } from "@/actions/advisor-teacher/get-advisor-teachers.action";
import PageTitle from "@/components/common/PageTitle";
import StudentForm from "@/components/forms/StudentForm";

export default async function NewStudentPage() {
  const data = await getAdvisorTeachers();

  const isDataAvailable =
    data && data.status !== "error" && Array.isArray(data) && data?.length;

  return (
    <>
      <PageTitle title="Create New Student" />
      <StudentForm data={isDataAvailable ? data : null} />
    </>
  );
}
