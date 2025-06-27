"use client";

import studentInformationFields from "@/data/student-information-fields.json";
import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import SubmitButton from "../common/SubmitButton";
import { AlertText } from "../common/AlertText";
import { MultiSelect } from "../common/MultiSelect";
import { extractStudentInformation } from "@/utils/functions/extract-student-information";
import { createStudentInformationFormAction } from "@/actions/student-information/create-student-information-form.action";
import { extractEducationTerm } from "@/utils/functions/extract-education-term";
import { extractLessons } from "@/utils/functions/extract-lessons";

export default function StudentInformationForm({
  studentsData,
  lessonsData,
  educationTermsData,
}) {
  const [state, action, pending] = useActionState(
    createStudentInformationFormAction
  );

  return (
    <form action={action} className={styles.form}>
      <div className={styles.inputsContainer}>
        {educationTermsData?.status === "error" && (
          <AlertText type="error" text={state?.message} />
        )}
        {lessonsData?.status === "error" && (
          <AlertText type="error" text={state?.message} />
        )}
        {studentsData?.status === "error" && (
          <AlertText type="error" text={state?.message} />
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="studentId" className={styles.label}>
            Students
          </label>
          {studentsData?.status === "error" ? (
            <p className={styles.customMessage}>
              There are no students assigned to this teacher
            </p>
          ) : (
            <select name="studentId" id="studentId" className={styles.input}>
              <option value="">Select a student</option>
              {extractStudentInformation(studentsData).map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>
          )}
          {state?.errors?.studentId && (
            <AlertText type="error" text={state?.errors?.studentId} />
          )}
        </div>

        {/* Education Term */}
        <div className={styles.inputGroup}>
          <label htmlFor="educationTermId" className={styles.label}>
            Education Term
          </label>
          {educationTermsData?.status === "error" ? (
            <p className={styles.customMessage}>
              There are no education terms available
            </p>
          ) : (
            <select
              name="educationTermId"
              id="educationTermId"
              className={styles.input}
            >
              <option value="">Select an education term</option>
              {extractEducationTerm(educationTermsData).map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>
          )}
          {state?.errors?.educationTermId && (
            <AlertText type="error" text={state?.errors?.educationTermId} />
          )}
        </div>

        {/* Lessons */}
        <div className={styles.inputGroup}>
          <label htmlFor="lessonId" className={styles.label}>
            Lessons
          </label>
          {lessonsData?.status === "error" ? (
            <p className={styles.customMessage}>
              There are no lessons available
            </p>
          ) : (
            <select name="lessonId" id="lessonId" className={styles.input}>
              <option value="">Select a lesson</option>
              {extractLessons(lessonsData).map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>
          )}
          {state?.errors?.lessonId && (
            <AlertText type="error" text={state?.errors?.lessonId} />
          )}
        </div>

        {studentInformationFields.map((field, index) => (
          <div className={styles.inputGroup} key={index}>
            <label htmlFor={field.name} className={styles.label}>
              {field.label}
            </label>
            {field.type !== "textarea" ? (
              <input
                type={field.type}
                autoComplete={field.autoComplete}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                className={styles.input}
              />
            ) : (
              <textarea
                type={field.type}
                autoComplete={field.autoComplete}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                className={styles.input}
              ></textarea>
            )}
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
        text="Create Student Information"
        loadingText="Creating"
      />
    </form>
  );
}
