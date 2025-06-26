import styles from "@/styles/components/cards/lesson-program-card.module.scss";
import DeleteButton from "../common/DeleteButton";
import { deleteEducationTerm } from "@/actions/education-term/delete-education-term.action";
import moment from "moment";
import { deleteLessonProgram } from "@/actions/lesson-program/delete-lesson-program.action";

export default function LessonProgramCard({ data, orderNumber, authorized }) {
  const itemName = `Lesson Program - ${data?.lessonProgramId}`;
  const start = data?.startTime || "00:00:00";
  const end = data?.stopTime || "00:00:00";

  const startAndEndTime = `${start.split(":")[0]}:${start.split(":")[1]} - ${
    end.split(":")[0]
  }:${end.split(":")[1]}`;

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>{itemName}</h2>
        {authorized && (
          <DeleteButton
            cb={deleteLessonProgram}
            title={`Delete ${itemName}`}
            id={data?.lessonProgramId}
            errorText={`Failed to delete ${itemName}`}
            questionText={`Are you sure you want to delete ${itemName}`}
            successText={`${itemName} is deleted successfully.`}
          />
        )}
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.classInfo}>
          <div className={styles.day}>
            <span>Day: </span>
            <span>{data?.day}</span>
          </div>
          <div className={styles.time}>{startAndEndTime}</div>
        </div>
        <div className={styles.lessonList}>
          {data?.lessonName &&
            data?.lessonName.map((lesson, index) => (
              <li key={index} className={styles.item}>
                <span>{lesson?.lessonName}</span>
                <span>Credits: {lesson?.creditScore}</span>
              </li>
            ))}
        </div>
      </div>
      <div className={styles.orderNumber}>{orderNumber}</div>
    </div>
  );
}
