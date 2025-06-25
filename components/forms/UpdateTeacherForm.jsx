"use client";

import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import genderOptions from "@/data/gender-options.json";
import teacherFields from "@/data/teacher-fields.json";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { MultiSelect } from "../common/MultiSelect";
import { updateTeacherFormAction } from "@/actions/teacher/update-teacher-form.action";
import { extractSelectedLessonPrograms } from "@/utils/functions/extract-selected-lesson-programs";

export default function UpdateTeacherForm({ lessonProgramsData, data, slug }) {
  const [state, action, pending] = useActionState(updateTeacherFormAction);

  console.log(lessonProgramsData);

  const style = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    gap: "24px",
  };

  console.log(data);
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
            defaultValue={data?.object?.gender}
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
          <label htmlFor="lessonsIdList" className={styles.label}>
            Lesson Programs
          </label>
          <MultiSelect
            data={lessonProgramsData}
            name="lessonsIdList"
            title="Lesson Program"
            defaultValues={extractSelectedLessonPrograms(
              data?.object?.lessonsProgramList
            )}
          />
          {state?.errors?.advisorTeacherId && (
            <AlertText type="error" text={state?.errors?.advisorTeacherId} />
          )}
        </div>

        <input type="hidden" name="id" value={slug} />
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
              {...(field.type === "checkbox"
                ? {
                    defaultChecked: data?.object?.isAdvisor,
                  }
                : {
                    defaultValue: data?.object?.[field.name],
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
        text={`Update Teacher`}
        loadingText="Updating"
      />
    </form>
  );
}
