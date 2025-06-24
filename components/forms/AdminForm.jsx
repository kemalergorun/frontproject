"use client";

import { createAdminFormAction } from "@/actions/admin/create-admin-form.action";
import styles from "@/styles/form.module.scss";
import { useActionState } from "react";
import genderOptions from "@/data/gender-options.json";
import adminFields from "@/data/admin-fields.json";
import { AlertText } from "../common/AlertText";
import SubmitButton from "../common/SubmitButton";
import { createAssistantManagerFormAction } from "@/actions/assistant-manager/create-assistant-manager-form.action";

export default function AdminForm({ buttonTitle = "Admin", type = "admin" }) {
  let formAction;

  if (type === "admin") {
    formAction = createAdminFormAction;
  } else if (type === "assistant-manager") {
    formAction = createAssistantManagerFormAction;
  }

  const [state, action, pending] = useActionState(formAction);

  console.log(state);

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
        {adminFields.map((field) => (
          <div key={field?._id} className={styles.inputGroup}>
            <label htmlFor={field?.name} className={styles.label}>
              {field?.label}
            </label>
            <input
              type={field?.type}
              autoComplete={field?.autoComplete}
              id={field?.name}
              placeholder={field?.placeholder}
              className={styles.input}
              name={field?.name}
            />
            {state?.errors?.[field?.name] && (
              <AlertText type="error" text={state?.errors?.[field?.name][0]} />
            )}
          </div>
        ))}
        {state?.errors?.common && (
          <AlertText type="error" text={state?.errors?.common} />
        )}
      </div>
      <SubmitButton
        pending={pending}
        text={`Create ${buttonTitle}`}
        loadingText="Creating"
      />
    </form>
  );
}
