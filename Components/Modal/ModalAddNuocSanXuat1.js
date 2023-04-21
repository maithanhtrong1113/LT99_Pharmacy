import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import { themNuocSanXuat } from "@/api/nuocSanXuatApi";
import { AiOutlinePlusCircle } from "react-icons/ai";
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
      <Button onClick={toggle} className="btn bg-secondary btn-sm text-white">
        <AiOutlinePlusCircle />
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

                  <div className="row d-flex justify-content-between ">
                    <div className="col-4">
                      <button
                        className="btn btn-danger btn-sm  text-white fw-bold w-100"
                        type="button"
                        onClick={toggle}
                      >
                        Hủy
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-info btn-sm text-white fw-bold w-100"
                        type="button"
                        onClick={submitHandler}
                      >
                        Thêm nước sản xuất
                      </button>
                    </div>
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
