import React, { useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalLapKKD(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteHandler = (e) => {
    props.submitHanlerr(e);
    toggle();
  };
  return (
    <div>
      <Button
        className="btn btn-success d-flex align-items-center"
        onClick={toggle}
      >
        <BsFillCartCheckFill className="fs-5 me-2" />
        Hoàn Tất
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Xác Nhận Lập Hóa Đơn</ModalHeader>
        <ModalBody>
          <b>Bạn có muốn xác nhận lập hóa đơn này</b>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" onClick={toggle}>
            Quay Về
          </Button>
          <Button color="primary" onClick={(e) => deleteHandler(e)}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalLapKKD;
