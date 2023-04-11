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
export const xoaNuocSanXuat = async (id) => {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nuoc-san-xuat/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    toast.error("Xóa nước sản xuất không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.success("Xóa nước sản xuất thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nuocSanXuat = await getAllNuocSanXuat();
  return nuocSanXuat;
};
export const chinhSuaNuocSanXuat = async (data) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nuoc-san-xuat/${data.maNuoc}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenNuoc: data.tenNuoc,
      }),
    }
  );
  if (response.ok) {
    toast.success("Chỉnh sửa nước sản xuất thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Chỉnh sửa nước sản xuất không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nuocSanXuat = await getAllNuocSanXuat();
  return nuocSanXuat;
};
