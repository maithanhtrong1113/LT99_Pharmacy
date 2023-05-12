import React from "react";
import { Container } from "reactstrap";
import Slider from "../Index/Slider";

import ListCard from "./ListCard";
import ListProduct from "./ListProduct";
import ListCardSlider from "./ListCardSlider";
import CountdownTimer from "./CountdownTimer";
import ListCard1 from "./ListCard1";
const Content = (props) => {
  return (
    <Container fluid>
      <Slider />
      <ListProduct />
      <ListCard />
      <ListCard1 />
      <CountdownTimer />
    </Container>
  );
};

export default Content;
