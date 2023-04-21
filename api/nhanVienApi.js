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
