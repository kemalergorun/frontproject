import { auth } from "@/auth";
import CreditScoreDistribution from "@/components/dashboard/CreditScoreDistribution";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import Grades from "@/components/dashboard/Grades";
import LessonPrograms from "@/components/dashboard/LessonPrograms";
import LessonTeachers from "@/components/dashboard/LessonTeachers";
import MeetingNotice from "@/components/dashboard/MeetingNotice";
import Notification from "@/components/dashboard/Notification";
import ShortcutLink from "@/components/dashboard/ShortcutLink";
import StudentsPerformanceScatterPlot from "@/components/dashboard/StudentsPerformanceScatterPlot";
import TeacherDemographics from "@/components/dashboard/TeacherDemographics";
import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart";
import UserInformation from "@/components/dashboard/UserInformation";
import styles from "@/styles/pages/dashboard-page.module.scss";

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user?.role;

  const isStudent = role === "STUDENT";

  return (
    <main className={styles.container}>
      <div className={styles.topbarContainer}>
        <ShortcutLink role={role} isStudent={isStudent} />

        <div className={styles.informationContainer}>
          <UserInformation
            fullName={`${session?.user?.name} ${session?.user?.surname}`}
            role={role}
          />
          <Notification />
        </div>
      </div>

      <DashboardBanner
        fullName={`${session?.user?.name} ${session?.user?.surname}`}
      />

      <div className={styles.contentContainer}>
        <div className={styles.contentOne}>
          <div className={styles.flexItemOne}>
            {isStudent ? (
              <>
                <Grades />
              </>
            ) : (
              <>
                {" "}
                <CreditScoreDistribution />
              </>
            )}
          </div>

          <div className={styles.flexItemTwo}>
            {isStudent ? (
              <>
                <LessonTeachers />
              </>
            ) : (
              <>
                {" "}
                <TeacherDemographics role={role} />{" "}
              </>
            )}
          </div>
        </div>

        <div className={styles.contentOne}>
          <div className={styles.flexItemOne}>
            {isStudent ? (
              <>
                {" "}
                <LessonPrograms />{" "}
              </>
            ) : (
              <>
                <TimeSeriesChart role={role} />
              </>
            )}
          </div>

          <div className={styles.flexItemTwo}>
            {isStudent ? (
              <>
                <MeetingNotice />
              </>
            ) : (
              <>
                <StudentsPerformanceScatterPlot />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}