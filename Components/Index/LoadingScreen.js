import React, { Fragment, useEffect, useState } from "react";

import BounceLoader from "react-spinners/BounceLoader";
import { Container } from "reactstrap";

const LoadingScreen = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Container fluid style={{ backgroundColor: "black" }}>
          <BounceLoader
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
            }}
            size={40}
            color={"#5bb8cb"}
            loading={loading}
          />
        </Container>
      ) : (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LoadingScreen;
