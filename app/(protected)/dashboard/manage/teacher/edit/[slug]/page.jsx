import { getLessonPrograms } from "@/actions/lesson-program/get-lesson-programs.action";
import { getTeacherById } from "@/actions/teacher/get-teacher-by-id.action";
import PageTitle from "@/components/common/PageTitle";
import UpdateTeacherForm from "@/components/forms/UpdateTeacherForm";

export default async function EditTeacherPage(props) {
  const { params } = await props;
  const { slug } = await params;

  const [teacherData, lessonProgramsData] = await Promise.all([
    getTeacherById(slug),
    getLessonPrograms(),
  ]);

  return (
    <>
      <PageTitle title={`Update Teacher - ${slug}`} />
      <UpdateTeacherForm
        slug={slug}
        data={teacherData}
        lessonProgramsData={lessonProgramsData}
      />
    </>
  );
}
