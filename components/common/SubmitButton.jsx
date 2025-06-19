import styles from "@/styles/components/common/submit-button.module.scss";
import { Loader } from "./Loader";
import { ThreeDots } from "./ThreeDots";

export default function SubmitButton({ pending, text, loadingText }) {
  return (
    <button
      className={styles.button}
      title={pending ? loadingText : text}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader />
          <span className={styles.submitting}>
            {loadingText}
            <ThreeDots />
          </span>
        </>
      ) : (
        text
      )}
    </button>
  );
}
