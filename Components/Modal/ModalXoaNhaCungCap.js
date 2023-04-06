import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalXoaNhaCungCap(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteHandler = () => {
    const nhaCungCapId = props.nhaCungCap.maNhaCungCap;
    props.handlerSubmit(nhaCungCapId);
    toggle();
  };
  return (
    <div>
      <Button color="danger" className="btn btn-danger btn-sm" onClick={toggle}>
        Xóa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Xóa nhà cung cấp</ModalHeader>
        <ModalBody>
          <p> Bạn có muốn xóa nhà cung cấp không?</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" onClick={toggle}>
            Hủy
          </Button>
          <Button color="danger" onClick={deleteHandler}>
            Xóa
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalXoaNhaCungCap;
