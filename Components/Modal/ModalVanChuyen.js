import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { BsTruck } from "react-icons/bs";
function Example(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState("tieuChuan");
  const luuHandler = (e) => {
    setPhuongThucVanChuyen(e.target.value);
    props.handlerChangeVanChuyen(e.target.value);
    toggle();
  };

  return (
    <Fragment>
      <button onClick={toggle} className="btn bg-light my-3">
        <div className="col-xl-12 col-lg-12 d-flex align-items-center text-muted">
          <BsTruck className="me-2 text-success " />
          {phuongThucVanChuyen === "nhanh" && (
            <span className="fs-14">
              Phương thức vận chuyển: <b>Nhanh</b>
            </span>
          )}
          {phuongThucVanChuyen === "tieuChuan" && (
            <span className="fs-14 mb-2">
              Phương thức vận chuyển: <b>Tiêu Chuẩn</b>
            </span>
          )}
        </div>
        {phuongThucVanChuyen === "tieuChuan" && (
          <div className="col-xl-12 col-lg-12 d-flex align-items-center justify-content-between text-dark">
            <span className="ms-4">Giao hàng tiết kiệm</span>
            <span className="text-info fw-bold">16.000 đ</span>
          </div>
        )}
        {phuongThucVanChuyen === "nhanh" && (
          <div className="col-xl-12 col-lg-12 d-flex align-items-center justify-content-between text-dark">
            <span className="ms-4">Ahamove</span>
            <span className="text-info fw-bold">25.000 đ</span>
          </div>
        )}
      </button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle} className="fw-bold">
          Chọn đơn vị vận chuyển
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form>
                  <div className="container border rounded shadow my-3 ">
                    <div className="row py-2">
                      <h6 className="text-info">Giao hàng tiết kiệm</h6>
                      <div className="col-4">
                        <span>Hình thức</span>
                      </div>
                      <div className="col-5">
                        <span className="text-success">Tiêu chuẩn</span>
                      </div>
                      <div className="col-3">
                        <input
                          className="form-check-input pointer"
                          type="radio"
                          name="phuongThucVanChuyen"
                          value="tieuChuan"
                          checked={phuongThucVanChuyen === "tieuChuan"}
                          onChange={luuHandler}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-4">
                        <span>Phí vận chuyển</span>
                      </div>
                      <div className="col-5">
                        <span className="text-success ">16.000 đ</span>
                      </div>
                    </div>
                  </div>
                  <div className="container border rounded shadow m y-3 ">
                    <div className="row py-2">
                      <h6 className="text-info">Ahamove</h6>
                      <div className="col-4">
                        <span>Hình thức</span>
                      </div>
                      <div className="col-5">
                        <span className="text-success text-end ">Nhanh</span>
                      </div>
                      <div className="col-3">
                        <input
                          className="form-check-input pointer"
                          type="radio"
                          value="nhanh"
                          name="phuongThucVanChuyen"
                          checked={phuongThucVanChuyen === "nhanh"}
                          onChange={luuHandler}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-4">
                        <span>Phí vận chuyển</span>
                      </div>
                      <div className="col-5">
                        <span className="text-success text-end ">25.000 đ</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="  d-flex justify-content-between">
          {/* <Button color="secondary" onClick={toggle}>
            Quay Về
          </Button> */}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}

export default Example;
