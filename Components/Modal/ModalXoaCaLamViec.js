import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalXoaCaLamViec(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteHandler = () => {
    const calamViecId = props.caLamViec.maCaLam;
    props.handlerSubmit(calamViecId);
    toggle();
  };
  return (
    <div>
      <Button color="danger" className="btn btn-danger btn-sm" onClick={toggle}>
        Xóa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Xóa ca làm việc</ModalHeader>
        <ModalBody>
          <p> Bạn có muốn xóa ca làm việc không?</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" onClick={toggle}>
            Hủy
          </Button>
          <Button color="danger" onClick={deleteHandler}>
            Xóa
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalXoaCaLamViec;
