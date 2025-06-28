import styles from "@/styles/components/cards/student-information-card.module.scss";
import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
import moment from "moment";
import { isPassingGrade } from "@/utils/functions/is-passing-grade";

export default function StudentInformationCard({
  data,
  orderNumber,
  deleteAction,
  type,
  isAuthorized,
}) {
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
      label: "Info Note:",
      style: "",
      value: data?.infoNote,
    },
    {
      label: "Lessons:",
      style: "",
      value: data?.lessonName,
    },
    {
      label: "Birth Date:",
      style: "",
      value:
        data?.studentResponse?.birthDay &&
        moment(data?.studentResponse?.birthDay).format("LL"),
    },
    {
      label: "Contact:",
      style: "",
      value: data?.studentResponse?.phoneNumber,
    },
    {
      label: "Email:",
      style: "",
      value: data?.studentResponse?.email,
    },
  ];

  console.log(isPassingGrade(99));

  const id = data?.id || data?.userId;

  const fullName = `${data?.studentResponse?.name} ${data?.studentResponse?.surname}`;

  type = type === "teacher" ? "student-information" : type;
  return (
    <div className={`${styles.cardContainer}`}>
      <div className={styles.cardHeader}>
        <h3>{fullName}</h3>
        {isAuthorized && (
          <div className={styles.buttonsContainer}>
            <EditButton
              title={`Edit ${fullName}`}
              href={`/dashboard/manage/${type}/edit/${id}`}
            />

            <DeleteButton
              cb={deleteAction}
              id={id}
              title={`Delete ${fullName}`}
              simple
              builtIn={data?.built_in}
              errorText={`Failed to delete ${fullName}`}
              questionText={`Are you sure you want to delete ${fullName}?`}
              successText={`${fullName} deleted successfully`}
            />
          </div>
        )}
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
      <div className={styles.orderNumber}>{orderNumber}</div>
    </div>
  );
}
