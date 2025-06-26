"use client";

import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import genderOptions from "@/data/gender-options.json";
import studentFields from "@/data/student-fields.json";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { updateStudentFormAction } from "@/actions/student/update-student-form.action";

export default function UpdateStudentForm({ advisorTeacherData, data, slug }) {
  const [state, action, pending] = useActionState(updateStudentFormAction);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="gender" className={styles.label}>
            Gender
          </label>
          <select
            className={styles.select}
            name="gender"
            id="gender"
            defaultValue={data?.gender}
          >
            {genderOptions.map((item) => (
              <option key={item?._id} value={item?.value}>
                {item?.label}
              </option>
            ))}
          </select>
          {state?.errors?.gender && (
            <AlertText type="error" text={state?.errors?.gender} />
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="advisorTeacherId" className={styles.label}>
            Advisor Teacher
          </label>
          <select
            name="advisorTeacherId"
            id="advisorTeacherId"
            className={styles.select}
            defaultValue={data?.advisorTeacherId}
          >
            {advisorTeacherData &&
              advisorTeacherData.map((item, index) => (
                <option key={index} value={item.advisorTeacherId}>
                  {item?.teacherName}
                  {item?.teacherSurname}
                </option>
              ))}
          </select>
          {state?.errors?.advisorTeacherId && (
            <AlertText type="error" text={state?.errors?.advisorTeacherId} />
          )}
        </div>

        <input type="hidden" name="id" value={slug} />
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
              {...(field.type === "checkbox"
                ? {
                    defaultChecked: data?.isAdvisor,
                  }
                : {
                    defaultValue: data?.[field.name],
                  })}
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
        text={`Update Student`}
        loadingText="Updating"
      />
    </form>
  );
}
