import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import { getChiTietDonHang } from "@/api/donHangApi";
import { MdOutlineClose } from "react-icons/md";
import VND from "../utils/formatVND";

function ModalXemChiTietDonHang(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [donHang, setDonHang] = useState({});
  async function ChiTietDonHang(maDonHang) {
    const data = await getChiTietDonHang(maDonHang);
    setDonHang(data);
  }
  useEffect(() => {
    ChiTietDonHang(props.donHang.maDonHang);
  }, []);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2 text-white">
        Xem Chi Tiết Đơn Hàng
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien2"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info"> Thông tin đơn hàng</span>
        </ModalHeader>
        <ModalBody>
          {Object.keys(donHang).length !== 0 && (
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
                          <label>{donHang.hoaDon.tenKhachHang}</label>
                        </div>
                      </div>
                      <div className="form-group row my-2 d-flex align-items-center">
                        <label className="col-sm-4 col-form-label fw-bold">
                          Số điện thoại:
                        </label>
                        <div className="col-sm-8">
                          <label>{donHang.hoaDon.sdtKhachHang}</label>
                        </div>
                      </div>
                      <div className="form-group row my-2 d-flex align-items-center">
                        <label className="col-sm-4 col-form-label fw-bold">
                          Địa chỉ giao hàng
                        </label>
                        <div className="col-sm-8">
                          <label>{donHang.hoaDon.diaChiGiaoHang}</label>
                        </div>
                      </div>
                      <div className="form-group row my-2 d-flex align-items-center">
                        <label className="col-sm-4 col-form-label fw-bold">
                          Trạng thái đơn hàng
                        </label>
                        <div className="col-sm-8">
                          <label>{donHang.hoaDon.trangThai}</label>
                        </div>
                      </div>
                      <div className="form-group row my-2 d-flex align-items-center">
                        <label className="col-sm-4 col-form-label fw-bold">
                          Ngày đặt đơn hàng
                        </label>
                        <div className="col-sm-8">
                          <label>{donHang.hoaDon.ngayTaoDonhHang}</label>
                        </div>
                      </div>

                      <div className="row d-flex justify-content-center "></div>
                    </form>
                  </div>
                </div>
              </div>
              <span className=" fst-italic text-muted ">
                Thông tin đơn hàng
              </span>
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
                              <th>Đơn vị tính</th>
                              <th>Số lượng</th>
                              <th>Đơn giá</th>
                              <th>Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donHang.hoaDon.chiTietDonHang.map((thuoc) => (
                              <tr>
                                <td>{thuoc.thuoc.maThuoc}</td>
                                <td className="w-40">{thuoc.thuoc.tenThuoc}</td>
                                <td>{thuoc.thuoc.donViTinh}</td>

                                <td>{thuoc.soLuong}</td>
                                <td>{VND.format(thuoc.donGia)}</td>
                                <td className="fw-bold">
                                  {VND.format(thuoc.thanhTien)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="form-group row d-flex align-items-center ">
                        <div className="col-12">
                          <b> Tổng tiền đơn hàng sau thuế:</b>
                          <span className="text-info fw-bold fs-25">
                            {` ${VND.format(donHang.hoaDon.tongSauThue)}`}
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

export default ModalXemChiTietDonHang;
