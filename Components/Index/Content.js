import React from "react";
import { Container } from "reactstrap";
import Slider from "../Index/Slider";

import ListCard from "./ListCard";
import ListProduct from "./ListProduct";
const Content = (props) => {
  return (
    <Container fluid>
      <Slider />
      <ListProduct />
      <ListCard />
    </Container>
  );
};

export default Content;
