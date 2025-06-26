import { getAdvisorTeachers } from "@/actions/advisor-teacher/get-advisor-teachers.action";
import { getStudentById } from "@/actions/student/get-student-by-id.action";
import PageTitle from "@/components/common/PageTitle";
import UpdateStudentForm from "@/components/forms/UpdateStudentForm";

export default async function EditStudentPage(props) {
  const { slug } = await props.params;

  const [studentData, advisorTeacherData] = await Promise.all([
    getStudentById(slug),
    getAdvisorTeachers(),
  ]);

  return (
    <>
      <PageTitle title={`Update Teacher - ${slug}`} />
      <UpdateStudentForm
        slug={slug}
        data={studentData}
        advisorTeacherData={advisorTeacherData}
      />
    </>
  );
}
