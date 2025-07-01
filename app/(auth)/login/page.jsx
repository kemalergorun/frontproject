"use client";

import { loginFormAction } from "@/actions/auth/login-form.action";
import { AlertText } from "@/components/common/AlertText";
import SubmitButton from "@/components/common/SubmitButton";
import { loginFields } from "@/data/login-fields";
import styles from "@/styles/pages/login-page.module.scss";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginFormAction);



  return (
    <form action={action} className={styles.form}>
      {loginFields.map((field, index) => (
        <div key={index} className={styles.inputGroup}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            autoComplete={field.autoComplete}
            id={field.name}
            placeholder={field.placeholder}
            className={styles.input}
            name={field.name}
          />

          {state?.errors?.[field.name] && (
            <AlertText type="error" text={state?.errors?.[field.name]} />
          )}
        </div>
      ))}

      {state?.errors?.common && (
        <AlertText type="error" text={state?.errors?.common} />
      )}

      <SubmitButton pending={pending} text="Sign In" loadingText="Signing In" />
    </form>
  );
}
