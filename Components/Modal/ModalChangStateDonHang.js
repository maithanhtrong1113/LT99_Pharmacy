import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

function ModalChangStateDonHang(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const toggle1 = () => {
    setModal(false);
  };
  const [donHang, setDonHang] = useState(props.donHang);
  const [color, setColor] = useState("");
  useEffect(() => {
    if (donHang.trangThaiDonHang === "WAITTING") {
      setColor("warning");
    } else if (donHang.trangThaiDonHang === "CANCELLED") {
      setColor("secondary denied");
    } else if (donHang.trangThaiDonHang === "DENIED") {
      setColor("danger denied");
    } else if (donHang.trangThaiDonHang === "ACCEPTED") {
      setColor("success denied");
    }
  }, [donHang]);
  const acpHandler = () => {
    props.submitAcp(donHang.maDonHang);
    toggle();
  };
  const deniedDonhangSubmit = () => {
    props.deniedDonHang(donHang.maDonHang);
    toggle();
  };
  return (
    <Fragment>
      <Button
        onClick={
          donHang.trangThaiDonHang === "CANCELLED" ||
          donHang.trangThaiDonHang === "DENIED" ||
          donHang.trangThaiDonHang === "ACCEPTED"
            ? toggle1
            : toggle
        }
        className={`btn btn-${color} btn-sm `}
      >
        {donHang.trangThaiDonHang}
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info">
            Chuyển đổi trạng thái đơn hàng
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="container ">
            <div className="row">
              {color === "warning" && (
                <div className="col-12 d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={acpHandler}
                  >
                    Chấp nhận đơn hàng
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={deniedDonhangSubmit}
                  >
                    Từ chối đơn hàng
                  </button>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalChangStateDonHang;
