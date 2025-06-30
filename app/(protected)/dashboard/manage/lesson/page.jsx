import { ListSkeleton } from '@/components/common/ListSkeleton';
import PageTitle from '@/components/common/PageTitle';
import PlusLink from '@/components/common/PlusLink';
import LessonList from '@/components/list/LessonList';
import styles from '@/styles/page.module.scss';
import { Suspense } from 'react';
import { PiNotebookFill } from 'react-icons/pi';

export default async function LessonManagementPage(props) {
    const searchParameters = await props.searchParams;
    let { size, page, sort, type } = searchParameters;

    size = size || 6;
    page = page || 1;
    sort = sort || 'lessonName';
    type = type || 'asc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/lesson/new" title="Lessons">
                    <PiNotebookFill />
                </PlusLink>
            </div>
            <PageTitle title="Lessons" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <LessonList
                        size={size}
                        page={page}
                        sort={sort}
                        type={type}
                    />
                </Suspense>
            </div>
        </>
    );
}
