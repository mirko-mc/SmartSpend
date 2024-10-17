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
    <ToggleButtonGroup type="checkbox" variant={Theme}>
      {Theme === "light" ? (
        <ToggleButton
          variant={Theme}
          onClick={() => SetTheme(Theme === "light" ? "dark" : "light")}
        >
          <FontAwesomeIcon icon={faSun} />
        </ToggleButton>
      ) : (
        <ToggleButton
          variant={Theme}
          onClick={() => SetTheme(Theme === "light" ? "dark" : "light")}
        >
          <FontAwesomeIcon icon={faMoon} />
        </ToggleButton>
      )}
      <ToggleButton
        variant={Theme}
        onClick={() => SetIsPrivacy(!IsPrivacy)}
        size="sm"
      >
        {Token && IsPrivacy ? (
          <FontAwesomeIcon icon={faEye} />
        ) : (
          Token && !IsPrivacy && <FontAwesomeIcon icon={faEyeSlash} />
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
