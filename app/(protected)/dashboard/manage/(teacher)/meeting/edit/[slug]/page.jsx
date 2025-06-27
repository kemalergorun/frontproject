import { getManagerById } from "@/actions/manager/get-manager-by-id.action";
import { getMeetingById } from "@/actions/meeting/get-meeting-by-id.action";
import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-student-as-advisor-teacher.action";
import PageTitle from "@/components/common/PageTitle";
import UpdateMeetingForm from "@/components/forms/UpdateMeetingForm";

export default async function EditMeetingPage(props) {
  const { params } = await props;
  const { slug } = await params;

  const [data, studentsData] = await Promise.all([
    getMeetingById(slug),
    getStudentsAsAdvisorTeacher(),
  ]);

  return (
    <>
      <PageTitle title={`Update Meeting - ${slug}`} />
      <UpdateMeetingForm slug={slug} data={data} studentsData={studentsData} />
    </>
  );
}
