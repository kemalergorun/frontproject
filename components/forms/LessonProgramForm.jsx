"use client";

import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import termsOptions from "@/data/term-options.json";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { createLessonProgramFormAction } from "@/actions/lesson-program/create-lesson-program-form.action";
import { extractEducationTerm } from "@/utils/functions/extract-education-term";
import { MultiSelect } from "../common/MultiSelect";
import { extractLessons } from "@/utils/functions/extract-lessons";
import weekdays from "@/data/weekday-options.json";

export default function LessonProgramForm({ educationTermsData, lessonsData }) {
  const [state, action, pending] = useActionState(
    createLessonProgramFormAction
  );

  const isEducationTermsData = educationTermsData?.status !== "error";

  let termOptions = [];

  if (isEducationTermsData) {
    termOptions = extractEducationTerm(educationTermsData);
  }

  console.log(lessonsData);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        {/* LESSON MULTIPLE SELECTION */}

        <div className={styles.inputGroup}>
          <label htmlFor="lessonIdList" className={styles.label}>
            Lessons
          </label>
          <MultiSelect
            data={extractLessons(lessonsData)}
            name="lessonIdList"
            title="Lessons"
          />
        </div>
        {state?.errors?.lessonIdList && (
          <AlertText type="error" text={state?.errors?.lessonIdList} />
        )}

        {/* EDUCATION TERMS */}

        <div className={styles.inputGroup}>
          <label htmlFor="educationTermId" className={styles.label}>
            Education Term
          </label>
          <select
            name="educationTermId"
            id="educationTermId"
            className={styles.select}
          >
            {termOptions.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        {state?.errors?.term && (
          <AlertText type="error" text={state?.errors?.term} />
        )}
        {/* DAY */}
        <div className={styles.inputContainer}>
          <label htmlFor="day" className={styles.labe}>
            Day
          </label>
          <select name="day" id="day" className={styles.select}>
            {weekdays.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </select>
          {state?.errors?.day && (
            <AlertText type="error" text={state?.errors?.day} />
          )}
        </div>
        {/* STARTIME */}
        <div className={styles.inputContainer}>
          <label htmlFor="startTime" className={styles.label}>
            Starts At
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            className={styles.input}
          />
          {state?.errors?.startTime && (
            <AlertText type="error" text={state?.errors?.startTime[0]} />
          )}
        </div>
        {/* END TIME */}
        <div className={styles.inputContainer}>
          <label htmlFor="stopTime" className={styles.label}>
            Ends At
          </label>
          <input
            type="time"
            id="stopTime"
            name="stopTime"
            className={styles.input}
          />
          {state?.errors?.stopTime && (
            <AlertText type="error" text={state?.errors?.stopTime[0]} />
          )}
        </div>
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
