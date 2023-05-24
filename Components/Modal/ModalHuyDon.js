import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch } from "react-redux";

function ModalHuyDon(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    toggle();
    props.huyDonHangClicks();
  };
  return (
    <div>
      <Button color="danger" className="btn-sm " onClick={toggle}>
        Hủy đơn
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle} className="fw-bold">
          Hủy đơn
        </ModalHeader>
        <ModalBody>
          <p>Bạn có muốn hủy đơn hàng?</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" onClick={toggle}>
            Quay Về
          </Button>
          <Button color="danger" onClick={deleteHandler}>
            Hủy
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalHuyDon;
