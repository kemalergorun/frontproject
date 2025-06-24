import styles from "@/styles/components/cards/admin-card.module.scss";
import EditButton from "../common/EditButton";
import DeleteButton from "../common/DeleteButton";
import { deleteAdmin } from "@/actions/admin/delete-admin.action";

export default function AdminCard({
  data,
  orderNumber,
  type = "admin",
  deleteAction = deleteAdmin,
  isEditButton,
}) {
  const fullName = `${data?.name} ${data?.surname}`;

  const dataToMap = [
    { label: "Full Name: ", value: fullName },
    { label: "SSN: ", value: data?.ssn },
    {
      label: "Birth Information: ",
      value: `${data?.birthDay} ${data?.birthPlace}`,
    },
    { label: "Phone: ", value: data?.phoneNumber },
    { label: "Gender: ", value: data?.gender },
  ];

  if (type === "student") {
    dataToMap.push(
      {
        label: "Email",
        value: data?.email,
      },
      {
        label: "Student Number",
        value: data?.studentNumber,
      },
      {
        label: "Advisor",
        value: `${data?.advisorTeacherName} ${data?.advisorTeacherSurname}`,
      }
    );
  }

  const id = data?.id || data?.userId;

  return (
    <div
      className={`${styles.cardContainer} ${
        data?.built_in ? styles.builtIn : ""
      }`}
    >
      <div className={styles.cardHeader}>
        @{data?.username}
        <div className={styles.buttonContainer}>
          {isEditButton && (
            <EditButton href={`/dashboard/manage/${type}/edit/${id}`} />
          )}

          <DeleteButton
            cb={deleteAction}
            title={`Delete ${fullName}`}
            id={id}
            simple
            builtIn={data?.built_in}
            errorText={`Failed to delete ${fullName}`}
            questionText={`Are you sure you want to delete ${fullName}`}
            successText={`${fullName} is deleted successfully.`}
          />
        </div>
      </div>
      <div className={styles.cardBody}>
        {dataToMap.map((item, index) => (
          <div key={index} className={styles.detail}>
            <span className={styles.detailLabel}>{item?.label}</span>
            <span className={styles.detailValue}>{item?.value || "N/A"}</span>
          </div>
        ))}
        <div className={styles.orderNumber}>{orderNumber}</div>
      </div>
    </div>
  );
}
