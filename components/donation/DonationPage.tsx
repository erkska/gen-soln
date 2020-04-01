import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

import DonationPageLayout from "./DonationPageLayout";
import DonationPageFormHeader from "./DonationPageFormHeader";
import DonationPageFormBody from "./DonationPageFormBody";

const useStyles = makeStyles({
  container: {
    minWidth: 420,
    flex: 0.48
  }
});

const DonationPage: React.FC = () => {
  const { container } = useStyles();

  return (
    <DonationPageLayout>
      <ContainerWithShadow className={container}>
        <DonationPageFormHeader />
        <DonationPageFormBody />
      </ContainerWithShadow>
    </DonationPageLayout>
  );
};

export default DonationPage;