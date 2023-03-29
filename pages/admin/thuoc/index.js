import ContentThuoc from "@/Components/Admin/ContentThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
// import fetch from "node-fetch";

const index = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentThuoc loaiThuoc={props.loaiThuoc} thuoc={props.thuoc} />
    </Fragment>
  );
};
export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
  );
  const data = await res.json();

  const res1 = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/"
  );
  const data1 = await res1.json();
  return {
    props: {
      loaiThuoc: data,
      thuoc: data1,
    },
  };
}
export default index;
