import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { kiemTraSoDienThoai } from "../utils/kiemTraSoDienThoai";
import { themNhaCungCap } from "@/api/nhaCungCapApi";
function ModalAddNhaCungCap1(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tenNhaCungCap, setTenNhaCungCap] = useState("");
  const [tenNhaCungCapFocus, setTenNhaCungCapFocus] = useState(false);
  const tenFocused = () => {
    setTenNhaCungCapFocus(true);
  };
  const [soDienThoai, setSoDienThoai] = useState("");
  const [soDienThoaiFocus, setSoDienThoaiFocus] = useState(false);
  const [errSDT, setErrSDT] = useState(false);
  const phoneFocused = () => {
    setSoDienThoaiFocus(true);
  };
  const [diaChi, setDiaChi] = useState("");
  const [diaChiFocus, setDiaChiFocus] = useState(false);
  const diaChiFocused = () => {
    setDiaChiFocus(true);
  };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onSubmit = (data) => {
    props.submitHandler(data);
    toggle();
  };
  const addNhaCungCapOnThuoc = async () => {
    if (!kiemTraSoDienThoai(soDienThoai)) {
      return;
    }
    if (soDienThoai === "" || diaChi === "" || tenNhaCungCap === "") {
      return;
    }
    const data = { soDienThoai, diaChi, tenNhaCungCap };
    const res = await themNhaCungCap(data);
    props.setNhaCungCap(res);
    toggle();
  };
  useEffect(() => {
    if (!kiemTraSoDienThoai(soDienThoai)) {
      setErrSDT(true);
    } else setErrSDT(false);
  }, [soDienThoai]);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-secondary btn-sm  text-white">
        <AiOutlinePlusCircle />
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold">Thêm Nhà Cung Cấp</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Tên Nhà Cung Cấp:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={(e) => setTenNhaCungCap(e.target.value)}
                        value={tenNhaCungCap}
                        onFocus={tenFocused}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {tenNhaCungCap === "" && tenNhaCungCapFocus && (
                        <span className="text-danger">
                          Vui lòng nhập tên nhà cung cấp
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Địa Chỉ
                    </label>
                    <div className="col-sm-7">
                      <input
                        value={diaChi}
                        onChange={(e) => {
                          setDiaChi(e.target.value);
                        }}
                        onFocus={diaChiFocused}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {diaChi === "" && diaChiFocus && (
                        <span className="text-danger">
                          Vui lòng nhập địa chỉ
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Số Điện Thoại
                    </label>
                    <div className="col-sm-7">
                      <input
                        value={soDienThoai}
                        onFocus={phoneFocused}
                        onChange={(e) => {
                          setSoDienThoai(e.target.value);
                        }}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {soDienThoai === "" && soDienThoaiFocus && (
                        <span className="text-danger">
                          Vui lòng nhập số điện thoại
                        </span>
                      )}
                      {errSDT && soDienThoai !== "" && (
                        <span className="text-danger">
                          Số điện thoại không tồn tại
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row d-flex justify-content-between ">
                    <div className="col-4">
                      <button
                        className="btn btn-danger my-3 btn-sm text-white fw-bold w-100"
                        type="button"
                        onClick={toggle}
                      >
                        Hủy
                      </button>
                    </div>
                    <div className="col-5">
                      <button
                        className="btn btn-info my-3 btn-sm text-white fw-bold w-100"
                        type="button"
                        onClick={addNhaCungCapOnThuoc}
                      >
                        Thêm Nhà Cung Cấp
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

export default ModalAddNhaCungCap1;
