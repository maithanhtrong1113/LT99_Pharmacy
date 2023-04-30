import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import VND from "../utils/formatVND";
import { getAllLoThuocFromNhaCungCap } from "@/api/nhaCungCapApi";

function ModalCacLoThuoc(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [lichSus, setLichSus] = useState([]);
  async function getAllLo(maNhaCungCap) {
    const data = await getAllLoThuocFromNhaCungCap(maNhaCungCap);
    setLichSus(data);
  }
  useEffect(() => {
    getAllLo(props.nhaCungCap.maNhaCungCap);
  }, []);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2 text-white">
        Các lô thuốc đã cung cấp
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalLoThuocFromNhaCungCap "
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info"> Các lô thuốc đã cung cấp</span>
        </ModalHeader>
        <ModalBody className="">
          {Object.keys(lichSus).length == 0 && (
            <span className="fw-bold">
              Không tìm thấy lô thuốc đã nhập từ nhà cung cung cấp
            </span>
          )}
          {Object.keys(lichSus).length !== 0 && (
            <>
              <span className=" fst-italic text-muted">
                Thông tin các lô thuốc
              </span>
              <div className="container rounded border shadow  overflow-auto">
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <table className="tableNhap table-striped table ">
                      <thead>
                        <tr>
                          <th className="pe-5">Mã Lô Thuốc</th>
                          <th className="pe-5"> Số Lô</th>
                          <th className="pe-5">Ngày Nhập </th>
                          <th className="pe-5">Ngày Sản Xuất</th>
                          <th className="pe-5">Ngày Hết Hạn</th>
                          <th className="pe-5">Số Lượng Nhập</th>
                          <th className="pe-5">Số Lượng Tồn</th>
                          <th className="pe-5">Giá Nhập</th>
                          <th className="pe-5">Giá Bán Sỉ</th>
                          <th className="pe-5">Giá Bán Lẻ</th>
                          <th className="pe-5">Nhà Cung Cấp</th>
                        </tr>
                      </thead>

                      <tbody>
                        {lichSus.map((lichSu) => (
                          <tr>
                            <td>{lichSu.maLoThuoc}</td>
                            <td>{lichSu.soLo}</td>
                            <td>
                              {format(
                                new Date(lichSu.ngayNhapLoThuoc),
                                "dd-MM-yyyy"
                              )}
                            </td>
                            <td>
                              {format(
                                new Date(lichSu.ngaySanXuat),
                                "dd-MM-yyyy"
                              )}
                            </td>
                            <td>
                              {format(
                                new Date(lichSu.ngayHetHan),
                                "dd-MM-yyyy"
                              )}
                            </td>
                            <td>{lichSu.soLuongNhap}</td>
                            <td>{lichSu.soLuongTon}</td>
                            <td className="fw-bold">
                              {VND.format(lichSu.giaNhap)}
                            </td>
                            <td className="fw-bold">
                              {VND.format(lichSu.giaBanSi)}
                            </td>
                            <td className="fw-bold">
                              {VND.format(lichSu.giaBanLe)}
                            </td>
                            <td>
                              {lichSu.nhaCungCap === null ? (
                                <BsThreeDots />
                              ) : (
                                lichSu.nhaCungCap.tenNhaCungCap
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default ModalCacLoThuoc;
