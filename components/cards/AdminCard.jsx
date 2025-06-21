import styles from "@/styles/components/cards/admin-card.module.scss";

export default function AdminCard({
  data,
  orderNumber,
  type = "admin",
  deleteAction,
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
          {isEditButton && <></>}
          {/* DeleteButton */}
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
