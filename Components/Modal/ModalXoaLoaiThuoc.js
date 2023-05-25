import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalXoaLoaiThuoc(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteHandler = () => {
    const loaiThuocId = props.loaiThuoc.maLoai;
    props.handlerSubmit(loaiThuocId);
    toggle();
  };
  return (
    <div>
      <Button color="danger" className="btn btn-danger btn-sm" onClick={toggle}>
        Xóa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Xóa loại thuốc</ModalHeader>
        <ModalBody>
          <b>
            Bạn có chắc chắn muốn xóa loại thuốc này? Hành động này không thể
            hoàn tác.
          </b>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" onClick={toggle}>
            Hủy
          </Button>
          <Button color="danger" onClick={deleteHandler}>
            Đồng ý
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalXoaLoaiThuoc;
