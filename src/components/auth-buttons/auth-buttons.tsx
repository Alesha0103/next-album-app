import React from "react";

import styles from "./auth-buttons.module.scss";
import { Loader } from "../loader/loader";
import { LoaderScale } from "@/models/loader-scale";
import classNames from "classnames";
import { AuthButtonType } from "@/models/auth-form";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  loader: boolean;
  disabled: boolean;
  type: AuthButtonType;
  onSubmitClick: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ loader, disabled, type, onSubmitClick }) => {
  const router = useRouter();

  const changeAuthFlow = () => {
    type === AuthButtonType.SIGN_UP ? router.push("/sign-in", { scroll: false }) : router.push("/sign-up", { scroll: false });
  }

  return (
    <div className={styles.authButtons}>
      {loader && ( <Loader loaderScale={LoaderScale.SMALL}/> )}
      <button
        className={classNames(styles.authButtonSubmit, {[styles.hiddenButton]: loader})}
        onClick={onSubmitClick}
        disabled={disabled}
      >
        {type === AuthButtonType.SIGN_UP ? "Submit" : "Sign In"}
      </button>
      <span>or</span>
      <button
        className={styles.authSecondButton}
        onClick={changeAuthFlow}
        disabled={!!loader}
      >
        {type === AuthButtonType.SIGN_UP ? "Sign In" : "Sign Up"}
      </button>
  </div>
  )
}
