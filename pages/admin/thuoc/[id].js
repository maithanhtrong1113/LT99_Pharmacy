import ContentChiTietThuoc from "@/Components/Admin/ContentChiTietThuoc";
import ContentLoaiThuoc from "@/Components/Admin/ContentLoaiThuoc";
import ContentThuoc from "@/Components/Admin/ContentThuoc";

import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";

const index = () => {
  return (
    <Fragment>
      <GoTopPage />
      <ContentChiTietThuoc />
    </Fragment>
  );
};

export default index;
