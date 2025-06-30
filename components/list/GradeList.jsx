import { getStudentInformationAsStudent } from '@/actions/student-information/get-student-information-as-student.action';
import styles from '@/styles/list.module.scss';
import NoDataAvailable from '../common/NoDataAvailable';
import StudentInformationCard from '../cards/StudentInformationCard';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import Pagination from '../common/Pagination';

export default async function GradeList({ page, size }) {
    const data = await getStudentInformationAsStudent({
        page: page - 1,
        size
    });

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data?.content) &&
        data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isDataAvailable ? (
                    data.content.map((item, index) => (
                        <StudentInformationCard
                            key={index}
                            data={item}
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                            type="student"
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/grades"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
