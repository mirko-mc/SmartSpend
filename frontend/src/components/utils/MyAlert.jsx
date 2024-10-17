import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AlertContext } from "../../context/AlertContextProvider";

export const MyAlert = () => {
  const { ShowAlert, SetShowAlert } = useContext(AlertContext);
  if (ShowAlert) {
    return (
      <Alert
        variant={ShowAlert.Variant}
        onClose={() => SetShowAlert(false)}
        dismissible
      >
        <Alert.Heading className="text-center">{ShowAlert.Title}</Alert.Heading>
        <p>{ShowAlert.Message}</p>
      </Alert>
    );
  }
};
