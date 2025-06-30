import styles from '@/styles/components/cards/lesson-card.module.scss';
import DeleteButton from '../common/DeleteButton';

export default function LessonCard({ data, orderNumber, deleteAction }) {
    const isCompulsory = data?.compulsory ? styles.danger : styles.warning;

    console.log(data);

    return (
        <div className={`${styles.cardContainer} ${isCompulsory}`}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{data?.lessonName}</h3>
                <DeleteButton
                    cb={deleteAction}
                    title={`Delete ${data?.lessonName}`}
                    id={data?.lessonId}
                    errorText={`Failed to delete ${data?.lessonName}`}
                    questionText={`Are you sure you want to delete ${data?.lessonName}`}
                    successText={`${data?.lessonName} is deleted successfully.`}
                />
            </div>

            <div>
                <p className={styles.item}>ID: {data?.lessonId}</p>

                <p className={styles.item}>Credits: {data?.creditScore}</p>

                <p className={`${styles.item} ${isCompulsory}`}>
                    {data?.compulsory ? 'Compulsory' : 'Optional'}
                </p>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
