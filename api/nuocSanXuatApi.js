import { toast } from "react-toastify";
export const getAllNuocSanXuat = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nuoc-san-xuat/`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
export const themNuocSanXuat = async (data) => {
  const response = await fetch(
    "http://localhost:8080/QLNT-Server/quan-ly/nuoc-san-xuat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenNuoc: data.tenNuoc,
      }),
    }
  );
  if (response.ok) {
    toast.success("Thêm nước sản xuất thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Thêm nước sản xuất không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nuocSanXuat = await getAllNuocSanXuat();
  return nuocSanXuat;
};
export const xoaCaLamViec = async (id) => {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/ca-lam-viec/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    toast.error("Xóa ca làm việc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.success("Xóa ca làm việc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const caLamViec = await getAllCaLamViec();
  return caLamViec;
};
export const chinhSuaCaLamViec = async (data) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/ca-lam-viec/${data.maCaLam}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenCa: data.tenCa,
        soGioLam: data.soGioLam,
      }),
    }
  );
  if (response.ok) {
    toast.success("Chỉnh sửa ca làm việc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Chỉnh sửa ca làm việc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const caLamViec = await getAllCaLamViec();
  return caLamViec;
};
