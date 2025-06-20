import { auth } from "@/auth";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import Notification from "@/components/dashboard/Notification";
import ShortcutLink from "@/components/dashboard/ShortcutLink";
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
              <>{/* GradeCard */}</>
            ) : (
              <>{/* <CreditScoreDistribution /> */}</>
            )}
          </div>

          <div className={styles.flexItemTwo}>
            {isStudent ? (
              <>{/* LessonTeachers */}</>
            ) : (
              <>{/* <TeacherDemographics /> */}</>
            )}
          </div>
        </div>

        <div className={styles.contentOne}>
          <div className={styles.flexItemOne}>
            {isStudent ? (
              <>{/* LessonProgram */}</>
            ) : (
              <>{/* <TimeSeriesChart /> */}</>
            )}
          </div>

          <div className={styles.flexItemTwo}>
            {isStudent ? (
              <>{/* MeetingNotice */}</>
            ) : (
              <>{/* <StudentPerformanceScatterPlot /> */}</>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
