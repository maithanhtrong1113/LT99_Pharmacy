import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { cartActions } from "@/store/cart-slice";
import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
function ModalAll(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(cartActions.removeAllItem());
    toggle();
    toast.success("Xóa tất cả sản phẩm trong giỏ hàng thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  };
  return (
    <div>
      <Button color="danger" className="btn-sm g" onClick={toggle}>
        <BsTrash />
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle} className="fw-bold">
          Xóa sản phẩm
        </ModalHeader>
        <ModalBody>
          <p>Bạn có muốn xóa toàn bộ sản phẩm khỏi giỏ hàng không?</p>
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

export default ModalAll;
