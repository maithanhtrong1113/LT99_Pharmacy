import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

function ModalXoaLoaiThuoc(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteHandler = () => {
    // toast.success("Xóa loại thuốc thành công", {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 1000,
    //   theme: "light",
    // });
    const loaiThuocId = props.loaiThuoc.maLoai;
    props.handlerSubmit(loaiThuocId);
    console.log(loaiThuocId);
    toggle();
  };
  return (
    <div>
      <Button color="danger" className="btn btn-danger btn-sm" onClick={toggle}>
        Xóa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Xóa sản phẩm</ModalHeader>
        <ModalBody>
          <p> Bạn có muốn xóa loại thuốc không?</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" onClick={toggle}>
            Quay Về
          </Button>
          <Button color="danger" onClick={deleteHandler}>
            Xóa
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalXoaLoaiThuoc;
