import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

function ModalAddThuoc(props) {
  const [loaiThuoc, setLoaiThuoc] = useState([]);
  const [loaiThuocSelected, setLoaiThuocSelected] = useState("");
  useEffect(() => {
    // danh sách loại thuốc truyền vào select option
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoaiThuoc(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onSubmit = (data) => {
    props.submitHandler(data);
    toggle();
  };

  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary my-3 text-white">
        Thêm Thuốc
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="modal-dialogg"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Thêm Thuốc</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* tên Thuốc */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Thuốc:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("tenThuoc", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.tenThuoc?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tên thuốc
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Loại thuốc */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Loại Thuốc
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select form-select-sm py-2"
                        aria-label=".form-select-sm"
                        defaultValue={loaiThuocSelected}
                        {...register("maLoai", {})}
                        onChange={(e) => {
                          setLoaiThuocSelected(e.target.value);
                        }}
                      >
                        {loaiThuoc.map((loaiThuoc) => (
                          <option
                            value={loaiThuoc.maLoai}
                            key={loaiThuoc.maLoai}
                            selected={
                              loaiThuoc.tenLoai === loaiThuocSelected
                                ? "selected"
                                : null
                            }
                          >
                            {loaiThuoc.tenLoai}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Liều lượng */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Liều Lượng:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("lieuLuong", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.lieuLuong?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập liều lượng
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Công dụng */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Công Dụng:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("congDung", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.congDung?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập công dụng
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Đơn vị tính */}
                  <div className="form-group row my-2 ">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Đơn vị tính:
                    </label>
                    <div className="col-sm-3">
                      <select
                        {...register("donViTinh")}
                        className="form-select form-select-sm "
                      >
                        <option value="Vỉ">Vỉ</option>
                        <option value="Viên">Viên</option>
                        <option value="Hộp">Hộp</option>
                        <option value="Cái">Cái</option>
                        <option value="Tuýp">Tuýp</option>
                      </select>
                    </div>
                    <div className="col-sm-2 fw-bold">Thuốc kê đơn:</div>
                    <div className="col-sm-3">
                      <select
                        {...register("thuocKeDon")}
                        className="form-select form-select-sm "
                      >
                        <option value="true">Có</option>
                        <option value="false">Không</option>
                      </select>
                    </div>
                  </div>

                  {/* Quy Cách Đóng Gói */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Quy cách đóng gói
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("quyCachDongGoi", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.quyCachDongGoi?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập quy cách đóng gói
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Tác Dụng Phụ */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tác Dụng Phụ
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("tacDungPhu", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.tacDungPhu?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tác dụng phụ
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Hướng dẫn sử dụng */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Hướng dẫn sử dụng
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("huongDanSuDung", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.huongDanSuDung?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập hướng dẫn sử dụng
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Mô tả */}
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mô tả
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        {...register("moTa", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.moTa?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập mô tả chung
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between ">
                    <button
                      className="btn btn-info my-3  text-white fw-bold w-25"
                      type="submit"
                    >
                      Thêm Thuốc
                    </button>
                    <button
                      className="btn btn-secondary my-3  text-white fw-bold w-25"
                      type="button"
                      onClick={() => {
                        toggle();
                      }}
                    >
                      Hủy
                    </button>
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

export default ModalAddThuoc;
