import { getEducationTerms } from "@/actions/education-term/get-education-term.action";
import { getLessons } from "@/actions/lesson/get-lessons.action";
import { getStudentInformationById } from "@/actions/student-information/get-student-information-by-id.action";
import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-student-as-advisor-teacher.action";
import PageTitle from "@/components/common/PageTitle";
import UpdateStudentInformationForm from "@/components/forms/UpdateStudentInformationForm";

export default async function EditStudentInformationPage(props) {
  const { params } = await props;
  const { slug } = await params;

  const [data, studentsData, lessonsData, educationTermsData] =
    await Promise.all([
      getStudentInformationById(slug),
      getStudentsAsAdvisorTeacher(),
      getLessons(),
      getEducationTerms(),
    ]);

  return (
    <>
      <PageTitle title={`Update Student Information - ${slug}`} />
      <UpdateStudentInformationForm
        slug={slug}
        data={data}
        studentsData={studentsData}
        lessonsData={lessonsData}
        educationTermsData={educationTermsData}
      />
    </>
  );
}
