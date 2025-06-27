"use client";

import meetingFields from "@/data/meeting-fields.json";
import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { createMeetingFormAction } from "@/actions/meeting/create-meeting-form.action";
import { MultiSelect } from "../common/MultiSelect";
import { extractStudentInformation } from "@/utils/functions/extract-student-information";

export default function MeetingForm({ data }) {
  const [state, action, pending] = useActionState(createMeetingFormAction);

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
              data={extractStudentInformation(data)}
              name="studentIds"
              title="Students"
            />
          )}
          {state?.errors?.studentIds && (
            <AlertText type="error" text={state?.errors?.studentIds} />
          )}
        </div>

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
        text="Create Meeting"
        loadingText="Creating"
      />
    </form>
  );
}
