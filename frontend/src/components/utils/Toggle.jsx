import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

export const Toggle = ({ favoriteTheme, HandleSaveTheme }) => {
  const { Token, Theme, SetTheme, ThemeClassName, IsPrivacy, SetIsPrivacy } =
    useContext(UserContext);

  return (
    <ToggleButtonGroup
      type="checkbox"
      // variant="outline-primary"
    >
      {Theme === "light" ? (
        <ToggleButton
          className={ThemeClassName()}
          // variant={Theme === "light" ? "success" : "outline-secondary"}
          onClick={() => SetTheme(Theme === "light" ? "dark" : "light")}
        >
          <FontAwesomeIcon icon={faSun} />
        </ToggleButton>
      ) : (
        <ToggleButton
          className={ThemeClassName()}
          // variant={Theme === "dark" ? "outline-success" : "danger"}
          onClick={() => SetTheme(Theme === "light" ? "dark" : "light")}
        >
          <FontAwesomeIcon icon={faMoon} />
        </ToggleButton>
      )}
      <ToggleButton
        // variant={Theme}
        className={ThemeClassName()}
        onClick={() => SetIsPrivacy(!IsPrivacy)}
        size="sm"
      >
        {IsPrivacy ? (
          <FontAwesomeIcon icon={faEye} />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}
      </ToggleButton>
      {Token && favoriteTheme !== Theme && (
        <ToggleButton variant={Theme} onClick={HandleSaveTheme}>
          <FontAwesomeIcon icon={faLock} />
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
};
