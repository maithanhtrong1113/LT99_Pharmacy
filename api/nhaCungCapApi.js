import { toast } from "react-toastify";
export const getAllNhaCungCap = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nha-cung-cap/`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
export const themNhaCungCap = async (data) => {
  const response = await fetch(
    "http://localhost:8080/QLNT-Server/quan-ly/nha-cung-cap/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenNhaCungCap: data.tenNhaCungCap,
        diaChi: data.diaChi,
        soDienThoai: data.soDienThoai,
      }),
    }
  );
  if (response.ok) {
    toast.success("Thêm nhà cung cấp thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Thêm nhà cung cấp không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nhaCungCap = await getAllNhaCungCap();
  return nhaCungCap;
};
export const xoaNhaCungCap = async (id) => {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nha-cung-cap/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    toast.error("Xóa nhà cung cấp không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.success("Xóa nhà cung cấp thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nhaCungCap = await getAllNhaCungCap();
  return nhaCungCap;
};
export const chinhSuaNhaCungCap = async (data) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nha-cung-cap/${data.maNhaCungCap}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenNhaCungCap: data.tenNhaCungCap,
        diaChi: data.diaChi,
        soDienThoai: data.soDienThoai,
      }),
    }
  );
  if (response.ok) {
    toast.success("Chỉnh sửa nhà cung cấp thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  } else {
    toast.error("Chỉnh sửa nhà cung cấp không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
  }
  const nhaCungCap = await getAllNhaCungCap();
  return nhaCungCap;
};
export const getAllLoThuocFromNhaCungCap = async (maNhaCungCap) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/nha-cung-cap/${maNhaCungCap}/xem-lo-thuoc-da-cung-cap`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
