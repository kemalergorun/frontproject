import { getEducationTerms } from "@/actions/education-term/get-education-term.action";
import { getLessons } from "@/actions/lesson/get-lessons.action";
import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-student-as-advisor-teacher.action";
import PageTitle from "@/components/common/PageTitle";
import StudentInformationForm from "@/components/forms/StudentInformationForm";

export default async function NewStudentInformationPage() {
  const [studentsData, lessonsData, educationTermsData] = await Promise.all([
    getStudentsAsAdvisorTeacher(),
    getLessons(),
    getEducationTerms(),
  ]);

  return (
    <>
      <PageTitle title="Create New Student Information" />
      <StudentInformationForm
        educationTermsData={educationTermsData}
        lessonsData={lessonsData}
        studentsData={studentsData}
      />
    </>
  );
}
