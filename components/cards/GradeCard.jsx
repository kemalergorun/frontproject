import styles from "@/styles/components/cards/student-information-card.module.scss";
import { isPassingGrade } from "@/utils/functions/is-passing-grade";

export default function GradeCard({ data }) {
  const dataToMap = [
    {
      label: "Midterm Exam:",
      style: isPassingGrade(data?.midtermExam) ? styles.success : styles.danger,
      value: data?.midtermExam,
    },
    {
      label: "Final Exam:",
      style: isPassingGrade(data?.finalExam) ? styles.success : styles.danger,
      value: data?.finalExam,
    },
    {
      label: "Average:",
      style: isPassingGrade(data?.average) ? styles.success : styles.danger,
      value: data?.average,
    },
    {
      label: "Absentee:",
      style: styles.danger,
      value: data?.absentee,
    },
    {
      label: "Letter Grade:",
      style: "",
      value: data?.note,
    },
    {
      label: "Lesson Type:",
      style: data?.compulsory ? styles.danger : styles.success,
      value: data?.compulsory ? "Compulsory" : "Elective",
    },
  ];

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={styles.cardHeader}>
        <h3>{data?.lessonName}</h3>
      </div>
      <div className={styles.cardBody}>
        <ul>
          {dataToMap.map((item, index) => (
            <li key={index} className={`${styles.cardItem} ${item?.style}`}>
              <span> {item?.label} </span>
              <span> {item?.value || "N/A"} </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
