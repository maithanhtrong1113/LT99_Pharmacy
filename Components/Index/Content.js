import React from "react";
import { Container } from "reactstrap";
import Slider from "../Index/Slider";

import ListCard from "./ListCard";
import ListProduct from "./ListProduct";
import ListCardSlider from "./ListCardSlider";
const Content = (props) => {
  return (
    <Container fluid>
      <Slider />
      <ListProduct />
      <ListCard />
      {/* <ListCardSlider /> */}
    </Container>
  );
};

export default Content;
