import { getLessonProgramAsStudent } from '@/actions/lesson-program/get-lesson-program-as-student.action';
import styles from '@/styles/list.module.scss';
import NoDataAvailable from '../common/NoDataAvailable';
import LessonProgramCard from '../cards/LessonProgramCard';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';

export default async function LessonListForStudent() {
    const data = await getLessonProgramAsStudent();

    const isDataAvailable =
        data &&
        data?.status !== 'error' &&
        Array.isArray(data) &&
        data.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isDataAvailable ? (
                    data.map((item, index) => (
                        <LessonProgramCard
                            key={index}
                            data={item}
                            orderNumber={calculateOrderNumber(1, 500, index)}
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
        </div>
    );
}
