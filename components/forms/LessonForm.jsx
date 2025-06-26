"use client";

import lessonFields from "@/data/lesson-fields.json";
import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { createLessonFormAction } from "@/actions/lesson/create-lesson-form.action";

export default function LessonForm() {
  const [state, action, pending] = useActionState(createLessonFormAction);

  const style = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    gap: "24px",
  };

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        {lessonFields.map((field, index) => (
          <div
            className={styles.inputGroup}
            style={index === 0 ? style : {}}
            key={index}
          >
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
        text="Create Lesson Program"
        loadingText="Creating"
      />
    </form>
  );
}
