import React from "react";
import { Container } from "reactstrap";
import Slider from "../Index/Slider";

import ListCard from "./ListCard";
import ListProduct from "./ListProduct";
import ListCardSlider from "./ListCardSlider";
import CountdownTimer from "./CountdownTimer";
const Content = (props) => {
  return (
    <Container fluid>
      <Slider />
      <ListProduct />
      <ListCard />
      <CountdownTimer />
    </Container>
  );
};

export default Content;
