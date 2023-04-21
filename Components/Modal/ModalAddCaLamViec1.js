import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { themCaLamViec } from "@/api/caLamViecApi";
import { AiOutlinePlusCircle } from "react-icons/ai";
function ModalAddCaLamViec1(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tenCa, setTenCa] = useState("");
  const [soGioLam, setSoGioLam] = useState("");
  const [tenCaFocus, setTenCaFocus] = useState(false);
  const [soGioLamFocus, setSoGioLamFocus] = useState(false);
  const [errSoGiolam, setErrSoGioLam] = useState(false);
  const onSubmit = (data) => {
    // props.submitHandler(data);
    toggle();
  };
  const soGioLamFocused = () => {
    setSoGioLamFocus(true);
  };
  const tenCaFocused = () => {
    setTenCaFocus(true);
  };
  const addCa = async () => {
    if (!validateSoGioLam(soGioLam)) {
      setErrSoGioLam(true);
      return;
    }
    console.log(tenCa, soGioLam);
    const res = await themCaLamViec({ tenCa, soGioLam });
    props.addCaLamViecHandler(res);
    toggle();
  };
  const validateSoGioLam = (value) => {
    if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (validateSoGioLam(soGioLam)) {
      setErrSoGioLam(false);
    }
  }, [soGioLam]);
  return (
    <Fragment>
      <Button onClick={toggle} className=" btn bg-primary btn-sm  text-white">
        <AiOutlinePlusCircle />
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Thêm Ca Làm Việc</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Ca Làm Việc:
                    </label>
                    <div className="col-sm-8">
                      <input
                        value={tenCa}
                        onChange={(e) => {
                          setTenCa(e.target.value);
                        }}
                        onFocus={tenCaFocused}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {tenCa === "" && tenCaFocus && (
                        <span className="text-danger">
                          Vui lòng nhập tên ca làm việc
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Số Giờ Làm
                    </label>
                    <div className="col-sm-8">
                      <input
                        value={soGioLam}
                        onChange={(e) => {
                          setSoGioLam(e.target.value);
                        }}
                        onFocus={soGioLamFocused}
                        type="number"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {soGioLam === "" && soGioLamFocus && (
                        <span className="text-danger">
                          Vui lòng nhập số giờ làm việc
                        </span>
                      )}
                      {errSoGiolam && soGioLam !== "" && (
                        <span className="text-danger">
                          Số giờ làm phải là số nguyên và lớn hơn 0
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
                      {" "}
                      <button
                        className="btn btn-info my-3 btn-sm text-white fw-bold w-100"
                        type="button"
                        onClick={addCa}
                      >
                        Thêm Ca Làm Việc
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

export default ModalAddCaLamViec1;
