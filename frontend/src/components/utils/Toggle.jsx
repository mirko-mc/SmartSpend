import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

const Toggle = () => {
  const {Theme,SetTheme} = useContext(UserContext);

  return (
    <Form>
      <ToggleButtonGroup type="checkbox" value={Theme} onChange={()=>SetTheme(!Theme)}>
        <ToggleButton variant="secondary" value="light">
          <FontAwesomeIcon icon={faMoon} />
        </ToggleButton>
        <ToggleButton variant="secondary" value="dark">
          <FontAwesomeIcon icon={faSun} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Form>
  );
};

export default Toggle;
