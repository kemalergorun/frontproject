import { ListSkeleton } from '@/components/common/ListSkeleton';
import PageTitle from '@/components/common/PageTitle';
import PlusLink from '@/components/common/PlusLink';
import AdminList from '@/components/list/AdminList';
import styles from '@/styles/page.module.scss';
import { Suspense } from 'react';
import { RiAdminFill } from 'react-icons/ri';

export default async function AdminManagementPage(props) {
    const searchParameters = await props.searchParams;
    let { size, page, sort, type } = searchParameters;

    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/admin/new" title="Admins">
                    <RiAdminFill />
                </PlusLink>
            </div>
            <PageTitle title="Admins" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <AdminList
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
