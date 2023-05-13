import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { getChiTietHoaDon } from "@/api/hoaDonApi";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import VND from "../utils/formatVND";

function ModalXemChiTietHoaDon(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [hoaDon, setHoaDon] = useState({});
  async function ChiTietHoaDon(maHoaDon) {
    const data = await getChiTietHoaDon(maHoaDon);
    setHoaDon(data);
  }
  useEffect(() => {
    ChiTietHoaDon(props.hoaDon.maHoaDon);
  }, []);
  console.log(hoaDon);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2">
        Xem Chi Tiết
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien2"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info">Thông tin hóa đơn</span>
        </ModalHeader>
        <ModalBody>
          {Object.keys(hoaDon).length !== 0 && (
            <>
              <span className=" fst-italic text-muted">
                Thông tin khách hàng
              </span>
              <div className="container rounded border shadow mb-3">
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <form noValidate className="">
                      <div className="form-group row my-2 d-flex align-items-center ">
                        <label className="col-sm-4 col-form-label fw-bold">
                          Tên khách hàng:
                        </label>
                        <div className="col-sm-8 fw-bold text-info">
                          <label>{hoaDon.hoaDon.tenKhachHang}</label>
                        </div>
                      </div>
                      <div className="form-group row my-2 d-flex align-items-center">
                        <label className="col-sm-4 col-form-label fw-bold">
                          Số điện thoại:
                        </label>
                        <div className="col-sm-8">
                          <label>{hoaDon.hoaDon.sdtKhachHang}</label>
                        </div>
                      </div>

                      <div className="row d-flex justify-content-center "></div>
                    </form>
                  </div>
                </div>
              </div>
              <span className=" fst-italic text-muted ">Thông tin hóa đơn</span>
              <div className="container rounded border shadow ">
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <form noValidate className="">
                      <div className="form-group row my-2 d-flex align-items-center ">
                        <table className="col-sm-12 table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Mã Thuốc</th>
                              <th scope="col">Tên Thuốc</th>
                              <th>Thuốc kê đơn</th>
                              <th>Số lượng</th>
                              <th>Đơn giá</th>
                              <th>Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hoaDon.hoaDon.chiTietHoaDon.map((thuoc) => (
                              <tr>
                                <td>{thuoc.thuoc.maThuoc}</td>
                                <td className="w-40">{thuoc.thuoc.tenThuoc}</td>
                                <td className="text-center">
                                  {thuoc.thuoc.keDon === true ? (
                                    <BsCheck2 className="text-success fs-25" />
                                  ) : (
                                    <MdOutlineClose className="text-danger fs-25" />
                                  )}
                                </td>
                                <td>{thuoc.soLuong}</td>
                                <td>{thuoc.donGia}</td>
                                <td className="fw-bold">
                                  {VND.format(thuoc.thanhTien)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="form-group row my-2 d-flex align-items-center ">
                        <div className="col-5">
                          <b>Tổng tiền trước thuế:</b>
                          <span className="text-warning fw-bold">
                            {` ${VND.format(hoaDon.hoaDon.tongTruocThue)}`}
                          </span>
                        </div>
                        <div className="col-3">
                          <b> Thuế:</b>
                          <span className="text-danger fw-bold">
                            {` ${VND.format(hoaDon.hoaDon.thue)}`}
                          </span>
                        </div>
                        <div className="col-4">
                          <b>Tổng tiền sau thuế:</b>
                          <span className="text-info fw-bold">
                            {` ${VND.format(hoaDon.hoaDon.tongSauThue)}`}
                          </span>
                        </div>
                        <div className="col-6 my-3">
                          <b> Nhân viên bán hàng:</b>
                          <span className="text-info fw-bold">
                            {` ${props.nhanvienBanHang}`}
                          </span>
                        </div>
                        <div className="col-6 my-3">
                          <b> Ngày lập hóa đơn:</b>
                          <span className="text-info fw-bold">
                            {` ${hoaDon.hoaDon.ngayLapHoaDon}`}
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalXemChiTietHoaDon;
