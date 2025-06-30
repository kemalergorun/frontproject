import { ListSkeleton } from '@/components/common/ListSkeleton';
import PageTitle from '@/components/common/PageTitle';
import GradeList from '@/components/list/GradeList';
import styles from '@/styles/page.module.scss';
import { Suspense } from 'react';

export default async function GradesPage(props) {
    const searchParams = await props.searchParams;
    let { page, size } = searchParams;
    page = page || 1;
    size = size || 6;

    return (
        <>
            <PageTitle title="Grades" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton height="290px" flex="1 0 700px" />}
                >
                    <GradeList page={page} size={size} />
                </Suspense>
            </div>
        </>
    );
}
