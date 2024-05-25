import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Particle from "../Particle";
function PageNotFound() {
  const [GoHomeIn, setGoHomeIn] = useState(7); // seconds: set to the number of seconds you want to count down from todo  change to 7s

  useEffect(() => {
    const interval = setInterval(() => {
      setGoHomeIn((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (GoHomeIn === 0) {
    window.location.href = "/";
  }

  return (
    <Container fluid className="NotFoundPage">
      <Row>
        <Col>
          <h1 style={{ fontSize: "5rem" }}>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
          <p>
            You will be redirected to the home page in{" "}
            <b className="blue" style={{ fontSize: "1.3em" }}>
              {" "}
              {GoHomeIn}
            </b>{" "}
            seconds.
          </p>
        </Col>
      </Row>
      <Particle />
    </Container>
  );
}

export default PageNotFound;
