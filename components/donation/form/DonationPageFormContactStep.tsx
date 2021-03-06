import React, { useContext, useCallback, useEffect } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";

import {
  ContactStepProps,
  DonationPageStateDispatch,
  setContactStepField,
  setIsCurStepCompleted
} from "./reducer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  name: {
    display: "flex",
    justifyContent: "space-between"
  },
  rightMargin: {
    marginRight: 24
  },
  verticalPositiveMargin: {
    marginTop: 7,
    marginBottom: 7
  },
  verticalNegativeMargin: {
    marginTop: -7,
    marginBottom: -7
  }
});

const DonationPageFormContactStep: React.FC<ContactStepProps> = ({
  firstName,
  lastName,
  email
}) => {
  const {
    container,
    name,
    rightMargin,
    verticalNegativeMargin,
    verticalPositiveMargin
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);

  useEffect(() => {
    // For this step, we will defter to the browser's API to indicate when the required TextFields have been filled
    dispatch && dispatch(setIsCurStepCompleted(true));
  }, [dispatch]);

  const onChange = useCallback(
    (
      key: keyof ContactStepProps,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      dispatch && dispatch(setContactStepField({ key, value: e.target.value }));
    },
    [dispatch]
  );

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          label="First Name"
          value={firstName}
          onChange={e => {
            onChange("firstName", e);
          }}
          autoComplete="given-name"
        />
        <TextField
          fullWidth
          required
          label="Last Name"
          value={lastName}
          onChange={e => {
            onChange("lastName", e);
          }}
          autoComplete="family-name"
        />
      </div>
      <TextField
        required
        fullWidth
        type="email"
        label="Email"
        className={verticalPositiveMargin}
        value={email}
        onChange={e => {
          onChange("email", e);
        }}
        autoComplete="email"
      />
    </div>
  );
};

export default DonationPageFormContactStep;
