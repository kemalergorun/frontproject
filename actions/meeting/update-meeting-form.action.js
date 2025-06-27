"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { createMeetingSchema } from "@/utils/validations/create-meeting-schema";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateMeeting } from "./update-meeting.action";

export const updateMeetingFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);
  const { id } = trimmedData;

  const dataToValidate = {
    date: new Date(trimmedData.date),
    description: trimmedData.description,
    startTime: moment(trimmedData.startTime, "HH:mm:ss").format("HH:mm"),
    stopTime: moment(trimmedData.stopTime, "HH:mm:ss").format("HH:mm"),
    studentIds: trimmedData.studentIds
      ? [...trimmedData.studentIds.split(",")]
      : [],
  };

  const validationResult = createMeetingSchema.safeParse(dataToValidate);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const payload = {
    ...validationResult.data,
    date: moment(validationResult.data.date).format("YYYY-MM-DD"),
  };

  let check;

  try {
    const response = await updateMeeting(payload, id);

    const data = await response.json();

    if (!response.ok)
      return errorObject("Failed to update Meeting.", {
        common: data?.message,
      });

    check = true;

    return {
      status: "success",
      message: "Meeting updated successfully!",
    };
  } catch (error) {
    return errorObject("There was an error updating the meeting.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/meeting");
    redirect("/dashboard/manage/meeting");
  }
};
"use client";

import meetingFields from "@/data/meeting-fields.json";
import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { MultiSelect } from "../common/MultiSelect";
import { extractStudentInformation } from "@/utils/functions/extract-student-information";
import { updateMeetingFormAction } from "@/actions/meeting/update-meeting-form.action";

export default function UpdateMeetingForm({ studentsData, data, slug }) {
  const [state, action, pending] = useActionState(updateMeetingFormAction);

  console.log("data: ", data);
  console.log("studentsData: ", studentsData);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="studentIds" className={styles.label}>
            Students
          </label>
          {data?.status === "error" ? (
            <p className={styles.customMessage}>
              There are no students assigned to this teacher
            </p>
          ) : (
            <MultiSelect
              data={extractStudentInformation(studentsData)}
              name="studentIds"
              title="Students"
              defaultValues={extractStudentInformation(data?.object?.students)}
            />
          )}
          {state?.errors?.studentIds && (
            <AlertText type="error" text={state?.errors?.studentIds} />
          )}
        </div>

        <input type="hidden" name="id" value={slug} />

        {meetingFields.map((field, index) => (
          <div className={styles.inputGroup} key={index}>
            <label htmlFor={field.name} className={styles.label}>
              {field.label}
            </label>
            <input
              type={field.type}
              autoComplete={field.autoComplete}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              className={styles.input}
              defaultValue={data?.object[field.name]}
            />
            {state?.errors?.[field.name] && (
              <AlertText type="error" text={state?.errors?.[field.name][0]} />
            )}
          </div>
        ))}

        {state?.errors?.common && (
          <AlertText type="error" text={state?.errors?.common} />
        )}
      </div>
      <SubmitButton
        pending={pending}
        text="Update Meeting"
        loadingText="Updating"
      />
    </form>
  );
}






