import { ListSkeleton } from '@/components/common/ListSkeleton';
import PageTitle from '@/components/common/PageTitle';
import MeetingListForStudent from '@/components/list/MeetingListForStudent';
import styles from '@/styles/page.module.scss';
import { Suspense } from 'react';

export default function MeetingPage() {
    return (
        <>
            <PageTitle title="Meetings" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton flex="1 1 600px" height="170px" />}
                >
                    <MeetingListForStudent />
                </Suspense>
            </div>
        </>
    );
}
