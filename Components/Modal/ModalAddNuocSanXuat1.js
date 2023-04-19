import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import { themNuocSanXuat } from "@/api/nuocSanXuatApi";
function ModalAddNuocSanXuat1(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tenNuoc, setTenNuoc] = useState("");
  const [tenNuocBlur, setTenNuocBlur] = useState(false);
  const submitHandler = async () => {
    if (tenNuoc === "") return;
    const res = await themNuocSanXuat({ tenNuoc });
    props.setNuocSanXuat(res);
    toggle();
  };

  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary btn-sm text-white">
        Thêm nước sản xuất
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Thêm nước sản xuất</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Tên nước sản xuất:
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        required
                        value={tenNuoc}
                        onBlur={() => {
                          setTenNuocBlur(true);
                        }}
                        onChange={(e) => {
                          setTenNuoc(e.target.value);
                        }}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {tenNuocBlur && tenNuoc === "" && (
                        <span className="text-danger">
                          Vui Lòng Nhập Tên Nước
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row d-flex justify-content-center ">
                    <button
                      className="btn btn-info my-3  text-white fw-bold w-100"
                      type="button"
                      onClick={submitHandler}
                    >
                      Thêm nước sản xuất
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalAddNuocSanXuat1;
