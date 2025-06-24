import { getAssistantManagerById } from "@/actions/assistant-manager/get-assistant-manager-by-id.action";
import PageTitle from "@/components/common/PageTitle";
import UpdateManagerForm from "@/components/forms/UpdateManagerForm";

export default async function EditAssistantManagerPage(props) {
  const parameters = await props.params;
  const { slug } = await parameters;

  const data = await getAssistantManagerById(slug);
  console.log(data);
  return (
    <>
      <PageTitle title={`Update Assistant Manager - ${slug}`} />

      <UpdateManagerForm slug={slug} data={data} type="assistant-manager" />
    </>
  );
}
