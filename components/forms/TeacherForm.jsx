"use client";

import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import genderOptions from "@/data/gender-options.json";
import teacherFields from "@/data/teacher-fields.json";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { createTeacherFormAction } from "@/actions/teacher/create-teacher-form.action";
import { MultiSelect } from "../common/MultiSelect";

export default function TeacherForm({ data }) {
  const [state, action, pending] = useActionState(createTeacherFormAction);

  const style = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    gap: "24px",
  };

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="gender" className={styles.label}>
            Gender
          </label>
          <select className={styles.select} name="gender" id="gender">
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
          <label htmlFor="lessonsIdList" className={styles.label}>
            Lesson Programs
          </label>
          <MultiSelect
            data={data}
            name="lessonsIdList"
            title="Lesson Program"
          />
          {state?.errors?.advisorTeacherId && (
            <AlertText type="error" text={state?.errors?.advisorTeacherId} />
          )}
        </div>

        {teacherFields.map((field, index) => (
          <div
            className={styles.inputGroup}
            style={index === teacherFields.length - 1 ? style : {}}
            key={index}
          >
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
        text={`Create Teacher`}
        loadingText="Creating"
      />
    </form>
  );
}
