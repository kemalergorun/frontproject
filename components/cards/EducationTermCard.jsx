import styles from "@/styles/components/cards/education-term-card.module.scss";
import DeleteButton from "../common/DeleteButton";
import { compareDateWithToday } from "@/utils/functions/compare-date-with-today";
import { deleteEducationTerm } from "@/actions/education-term/delete-education-term.action";
import moment from "moment";

export default function EducationTermCard({ data, orderNumber, authorized }) {
  const dateTimeComparison = compareDateWithToday(data?.lastRegistrationDate);

  const educationTermName = `${data?.term} ${data?.id}`;

  return (
    <div className={`${styles.cardContainer} ${styles[dateTimeComparison]}`}>
      {authorized && (
        <div className={styles.deleteContainer}>
          <DeleteButton
            cb={deleteEducationTerm}
            title={`Delete ${educationTermName}`}
            id={data?.id}
            errorText={`Failed to delete ${educationTermName}`}
            questionText={`Are you sure you want to delete ${educationTermName}`}
            successText={`${educationTermName} is deleted successfully.`}
          />
        </div>
      )}

      <h2 className={styles.term}>{educationTermName}</h2>
      <p className={styles.item}>
        Start Date: {moment(data?.startDate).format("LL")}
      </p>

      <p className={styles.item}>
        End Date: {moment(data?.endDate).format("LL")}
      </p>

      <p className={styles.item}>
        <span>Last Registration Date:</span>
        <span>{moment(data?.lastRegistrationDate).format("LL")}</span>
      </p>

      <div className={styles.orderNumber}>{orderNumber}</div>
    </div>
  );
}
