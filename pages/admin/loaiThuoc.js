import ContentLoaiThuoc from "@/Components/Admin/ContentLoaiThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const loaiThuoc = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentLoaiThuoc loaiThuoc={props.loaiThuoc} />
    </Fragment>
  );
};
export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
  );
  const data = await res.json();

  return {
    props: {
      loaiThuoc: data,
    },
  };
}
export default loaiThuoc;
