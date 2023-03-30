import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
function Example(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(cartActions.removeItemById(props.id));
    toggle();
    toast.success("Xóa sản phẩm thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  };
  return (
    <div>
      <Button color="danger" onClick={toggle} className="btn-mb mb-2">
        {props.content}
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Xóa sản phẩm</ModalHeader>
        <ModalBody>
          <p> Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
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

export default Example;
