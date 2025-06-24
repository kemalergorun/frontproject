"use client";
import { updateAssistantManagerFormAction } from "@/actions/assistant-manager/update-assistant-manager-form.action";
import styles from "@/styles/list.module.scss";
import { useActionState } from "react";
import genderOptions from "@/data/gender-options.json";
import adminFields from "@/data/admin-fields.json";

export default function UpdateManagerForm({ slug, data, type = "manager" }) {
  const formAction =
    type === "manager" ? () => {} : updateAssistantManagerFormAction();

  const [state, action, pending] = useActionState(formAction);

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

        <input type="hidden" name="userId" value={slug} />

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
              defaultValue={data?.object?.[field?.name]}
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
