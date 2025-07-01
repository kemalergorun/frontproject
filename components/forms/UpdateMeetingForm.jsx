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
