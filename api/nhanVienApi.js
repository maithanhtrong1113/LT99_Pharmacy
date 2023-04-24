import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const getNhanVienTheoCaLamViec = async (maCaLam) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/ca-lam-viec/${maCaLam}`
  );
  const data = await response.json();
  return data;
};
export const getAllNhanVien = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/danh-sach-nhan-vien`
  );
  const data = await response.json();
  return data;
};
export const chinhSuaNhanVienByQuanLy = async (data) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nhan-vien/${data.maNhanVien}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hoTen: data.hoTen,
        soDienThoai: data.soDienThoai,
        diaChi: data.diaChi,
        gioiTinh: data.gioiTinh,
        ngaySinh: data.ngaySinh,
        caLamViec: data.caLamViec,
      }),
    }
  );
  if (response.ok) {
    toast.success("Chỉnh sửa nhân viên thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Chỉnh sửa nhân viên không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nhanVien = await getAllNhanVien();
  return nhanVien;
};
export const changePass = async (data, role) => {
  const id = localStorage.getItem("id");
  const url =
    role === 1
      ? `http://localhost:8080/QLNT-Server/quan-ly/doi-mat-khau/${id}`
      : `http://localhost:8080/QLNT-Server/nhan-vien/doi-mat-khau/${id}`;
  const response = await fetch(`${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: localStorage.getItem("username"),
      oldPass: data.passwordold,
      newPass: data.password,
    }),
  });
  if (response.ok) {
    toast.success("Đổi mật khẩu thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    return true;
  } else {
    toast.error("Đổi mật khẩu không thành công", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000,
      theme: "light",
    });
    return false;
  }
};

export const chinhSuaThongTinCaNhan = async (data) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/cap-nhat-thong-tin-ca-nhan/${data.maNhanVien}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hoTen: data.hoTen,
        soDienThoai: data.soDienThoai,
        diaChi: data.diaChi,
        gioiTinh: data.gioiTinh,
        ngaySinh: data.ngaySinh,
        caLamViec: data.caLamViec,
      }),
    }
  );
  if (response.ok) {
    toast.success("Chỉnh sửa thông tin thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Chỉnh sửa thông tin không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
};
