import { useContext } from "react";
import { Card, Placeholder } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

export const CardLoader = () => {
  const { Theme } = useContext(UserContext);
  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant={Theme} xs={6} />
      </Card.Body>
    </Card>
  );
};
