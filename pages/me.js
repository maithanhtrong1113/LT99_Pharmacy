import React, { Fragment, useEffect, useState } from "react";
import Content from "../Components/Me/Content";
import Navigation from "../Components/Index/Navigation";
import RouteGuard from "../Components/RouteGuard/RouteGuard";
import NotShowMess from "@/Components/utils/showMess";

const me = () => {
  NotShowMess();
  return (
    <RouteGuard>
      <Navigation />
      <Content />
    </RouteGuard>
  );
};

export default me;
