export const extractStudentInformation = (data) => {
  if (!data || data?.status === "error") return [];

  return data.map((studentInformation) => ({
    value: studentInformation.userId || studentInformation.id,
    label: `${studentInformation.name} ${studentInformation.surname}`,
  }));
};
