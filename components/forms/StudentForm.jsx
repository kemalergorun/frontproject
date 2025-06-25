"use client";

import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import genderOptions from "@/data/gender-options.json";
import studentFields from "@/data/student-fields.json";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { createStudentFormAction } from "@/actions/student/create-student-form.action";

export default function StudentForm({ data }) {
  const [state, action, pending] = useActionState(createStudentFormAction);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="gender" className={styles.label}>
            Gender
          </label>
          <select name="gender" id="gender" className={styles.select}>
            {genderOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {state?.errors?.gender && (
            <AlertText type="error" text={state?.errors?.gender} />
          )}
        </div>
        {/* ADVISOR TEACHER */}

        <div className={styles.inputGroup}>
          <label htmlFor="advisorTeacherId" className={styles.label}>
            Advisor Teacher
          </label>
          <select
            name="advisorTeacherId"
            id="advisorTeacherId"
            className={styles.select}
          >
            {data &&
              data.map((item, index) => (
                <option key={index} value={item.advisorTeacherId}>
                  {item.teacherName}
                  {item.teacherSurname}
                </option>
              ))}
          </select>
          {state?.errors?.advisorTeacherId && (
            <AlertText type="error" text={state?.errors?.advisorTeacherId} />
          )}
        </div>

        {studentFields.map((field, index) => (
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
        text={`Create Student`}
        loadingText="Creating"
      />
    </form>
  );
}
