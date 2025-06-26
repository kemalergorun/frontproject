"use client";

import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import termsOptions from "@/data/term-options.json";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { createEducationTermFormAction } from "@/actions/education-term/create-education-term-form.action";
import educationTermFields from "@/data/education-term-fields.json";

export default function EducationTermForm() {
  const [state, action, pending] = useActionState(
    createEducationTermFormAction
  );

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        {/* TERM */}
        <div className={styles.inputGroup}>
          <label htmlFor="term" className={styles.label}>
            term
          </label>
          <select name="term" id="term" className={styles.select}>
            {termsOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {state?.errors?.gender && (
            <AlertText type="error" text={state?.errors?.gender} />
          )}
        </div>

        {educationTermFields.map((field, index) => (
          <div className={styles.inputGroup} key={index}>
            <label htmlFor={field.name} className={styles.label}>
              {field?.label}
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
        text={`Create Education Term`}
        loadingText="Creating"
      />
    </form>
  );
}
