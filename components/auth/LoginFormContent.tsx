import React, { useState, useCallback } from "react";

import { login } from "requests/admin";
import { useRouter } from "next/router";
import errors from "utils/errors";
import urls from "config";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";
import AuthPageForm from "./AuthPageForm";
import LoginFormEmailField from "./LoginFormEmailField";
import LoginFormPasswordField from "./LoginFormPasswordField";

import { ContentComponentProps } from "./types";

const LoginFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setHasError(false);
    },
    []
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setHasError(false);
    },
    []
  );

  const onPressCTA = useCallback(async () => {
    try {
      await login(email, password);
      router.push({
        pathname: urls.pages.index
      });
    } catch (err) {
      setError(
        err.message === errors.admin.INVALID_EMAIL ||
          err.message === errors.admin.INVALID_PASSWORD
          ? "Invalid email or password. Please try again."
          : "An unexpected error occured. Please try again."
      );
      setHasError(true);
    }
  }, [email, password, router]);

  const onClickForgotPassword = useCallback(() => {
    navigateToContent("forgotPassword");
    // TODO: Code for forgot password
  }, [navigateToContent]);

  return (
    <AuthPageForm
      title="Sign in"
      ctaText="SIGN IN"
      onPressCTA={onPressCTA}
      setHasError={setHasError}
      footer={
        <ButtonWithLowercaseText
          disableRipple
          color="secondary"
          onClick={onClickForgotPassword}
        >
          Forgot password?
        </ButtonWithLowercaseText>
      }
    >
      <LoginFormEmailField
        email={email}
        onChangeEmail={onChangeEmail}
        hasError={hasError}
      />
      <LoginFormPasswordField
        password={password}
        onChangePassword={onChangePassword}
        hasError={hasError}
        hasErrorHelperText={error}
      />
    </AuthPageForm>
  );
};

export default LoginFormContent;
