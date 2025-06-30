import { getMeetingsAsStudent } from '@/actions/meeting/get-meeting-as-student.action';
import styles from '@/styles/list.module.scss';
import NoDataAvailable from '../common/NoDataAvailable';
import MeetingCard from '../cards/MeetingCard';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';

export default async function MeetingListForStudent() {
    const data = await getMeetingsAsStudent();

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data) &&
        data.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isDataAvailable ? (
                    <MeetingCard
                        key={index}
                        data={item}
                        orderNumber={calculateOrderNumber(1, 500, index)}
                    />
                ) : (
                    <NoDataAvailable />
                )}
            </div>
        </div>
    );
}
