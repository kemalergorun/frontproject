import PageTitle from "@/components/common/PageTitle";
import AdminForm from "@/components/forms/AdminForm";

export default function NewManagerPage() {
  return (
    <>
      <PageTitle title="Create New Manager" />
      <AdminForm buttonTitle="Manager" type="manager" />
    </>
  );
}
