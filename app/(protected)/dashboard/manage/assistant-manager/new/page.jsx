import PageTitle from "@/components/common/PageTitle";
import AdminForm from "@/components/forms/AdminForm";

export default function NewAssistantManagerPage() {
  return (
    <>
      <PageTitle title="Create New Assistant Manager" />
      <AdminForm buttonTitle="Assistant Manager" type="assistant-manager" />
    </>
  );
}
