import ContentThuoc from "@/Components/Admin/ContentThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";

const index = () => {
  return (
    <Fragment>
      <GoTopPage />
      <ContentThuoc />
    </Fragment>
  );
};

export default index;
