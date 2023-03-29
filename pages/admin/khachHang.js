import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentKhachHang from "@/Components/Admin/ContentKhachHang";
const khachHang = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentKhachHang khachHang={props.khachHang} />
    </Fragment>
  );
};
export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/danh-sach-khach-hang"
  );
  const data = await res.json();

  return {
    props: {
      khachHang: data,
    },
  };
}
export default khachHang;
