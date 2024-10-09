import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

export const Toggle = ({ favoriteTheme, HandleSaveTheme }) => {
  const { Theme, SetTheme } = useContext(UserContext);

  return (
    <ToggleButtonGroup type="checkbox" variant="outline-primary">
      <ToggleButton
        variant={Theme}
        value={Theme}
        onClick={() => SetTheme(Theme === "light" ? "dark" : "light")}
      >
        <FontAwesomeIcon icon={faSun} />
      </ToggleButton>
      <ToggleButton
        variant={!Theme}
        value={!Theme}
        onClick={() => SetTheme(Theme === "light" ? "dark" : "light")}
      >
        <FontAwesomeIcon icon={faMoon} />
      </ToggleButton>
      {favoriteTheme !== Theme && (
        <ToggleButton variant={Theme} onClick={HandleSaveTheme}>
          <FontAwesomeIcon icon={faLock} />
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
};
