import { getManagerById } from "@/actions/manager/get-manager-by-id.action";
import PageTitle from "@/components/common/PageTitle";
import UpdateManagerForm from "@/components/forms/UpdateManagerForm";

export default async function EditManagerPage(props) {
  const { params } = await props;
  const { slug } = await params;

  const data = await getManagerById(slug);

  return (
    <>
      <PageTitle title={`Update Manager - ${slug}`} />
      <UpdateManagerForm slug={slug} data={data} type="manager" />
    </>
  );
}
