import { toast } from "react-toastify";

export const getAllLoaiThuoc = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/`
  );
  const data = await response.json();
  return data;
};

export const themLoaiThuoc = async (data) => {
  const response = await fetch(
    "http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenLoai: data.tenLoai,
        moTaChung: data.moTaChung,
      }),
    }
  );
  if (response.ok) {
    toast.success("Thêm loại thuốc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Thêm loại thuốc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const loaiThuoc = await getAllLoaiThuoc();
  return loaiThuoc;
};
export const xoaLoaiThuoc = async (id) => {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/loai-thuoc/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    toast.error("Xóa loại thuốc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.success("Xóa loại thuốc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const loaithuoc = await getAllLoaiThuoc();
  return loaithuoc;
};
export const chinhSuaThuoc = async (data) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/loai-thuoc/${data.maLoai}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenLoai: data.tenLoai,
        moTaChung: data.moTaChung,
      }),
    }
  );
  if (response.ok) {
    toast.success("Chỉnh sửa loại thuốc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Chỉnh sửa loại thuốc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const loaithuoc = await getAllLoaiThuoc();
  return loaithuoc;
};
export const getAllLoaiThuocKhach = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/khach-hang/xem-thuoc/loai-thuoc/`
  );
  const data = await response.json();
  return data.slice(0, 6);
};
