import { ListSkeleton } from '@/components/common/ListSkeleton';
import PageTitle from '@/components/common/PageTitle';
import LessonListForStudent from '@/components/list/LessonListForStudent';
import styles from '@/styles/page.module.scss';
import { Suspense } from 'react';

export default async function LessonsPage() {
    return (
        <>
            <PageTitle title="Lessons" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <LessonListForStudent />
                </Suspense>
            </div>
        </>
    );
}
