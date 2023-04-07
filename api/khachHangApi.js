import { toast } from "react-toastify";
export const getAllKhachHang = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/danh-sach-khach-hang`
  );
  const data = await response.json();
  return data;
};
export const themKhachHang = async (data) => {
  const response = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/khach-hang ",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hoTen: data.name,
        soDienThoai: data.phone,
        diaChi: data.diaChi,
        gioiTinh: data.gender,
        ngaySinh: data.date,
      }),
    }
  );
  if (response.ok) {
    toast.success("Thêm khách hàng thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Thêm khách hàng không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const khachHangs = await getAllKhachHang();
  return khachHangs;
};
