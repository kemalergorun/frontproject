import { getEducationTerms } from "@/actions/education-term/get-education-term.action";
import { getLessons } from "@/actions/lesson/get-lessons.action";
import PageTitle from "@/components/common/PageTitle";
import LessonProgramForm from "@/components/forms/LessonProgramForm";

export default async function NewLessonProgramPage() {
  const [educationTermsData, lessonsData] = await Promise.all([
    getEducationTerms(),
    getLessons(),
  ]);

  return (
    <>
      <PageTitle title="Create New Lesson Program" />
      <LessonProgramForm
        educationTermsData={educationTermsData}
        lessonsData={lessonsData}
      />
    </>
  );
}
