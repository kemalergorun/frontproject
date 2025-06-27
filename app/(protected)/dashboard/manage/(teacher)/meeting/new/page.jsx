import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-student-as-advisor-teacher.action";
import PageTitle from "@/components/common/PageTitle";
import MeetingForm from "@/components/forms/MeetingForm";

export default async function NewMeetingPage() {
  const data = await getStudentsAsAdvisorTeacher();

  return (
    <>
      <PageTitle title="Create New Meeting" />
      <MeetingForm data={data} />
    </>
  );
}
