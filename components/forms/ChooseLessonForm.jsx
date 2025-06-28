"use client";

import styles from "@/styles/components/dashboard/choose-lesson-form.module.scss";
import { useActionState } from "react";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { chooseLessonProgramFormAction } from "@/actions/lesson-program/choose-lesson-program-form.action";
import LessonProgramCard from "../cards/LessonProgramCard";

export default function ChooseLessonForm({ data }) {
  const [state, action, pending] = useActionState(
    chooseLessonProgramFormAction
  );

  console.log(data);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        {data.map((item, index) => (
          <div className={styles.inputGroup} key={index}>
            <input
              type="checkbox"
              id={item?.lessonProgramId}
              name="lessonProgramId"
              className={styles.input}
              value={item?.lessonProgramId}
            />
            <label
              htmlFor={item?.lessonProgramId}
              className={styles.label}
              title={`Choose Lesson Program - ${item?.lessonProgramId}`}
            >
              <LessonProgramCard data={item} />
            </label>
            {state?.errors?.[item.lessonProgramId] && (
              <AlertText
                type="error"
                text={state?.errors?.[item.lessonProgramId][0]}
              />
            )}
          </div>
        ))}

        {state?.errors?.common && (
          <AlertText type="error" text={state?.errors?.common} />
        )}
      </div>
      <SubmitButton
        pending={pending}
        text="Choose Lesson Program"
        loadingText="Choosing"
      />
    </form>
  );
}
