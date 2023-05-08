import { toast } from "react-toastify";

export const getAllThuoc = async () => {
  const response = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc"
  );
  const data = await response.json();
  return data;
};
export const getThuocTheoLoai = async (loaiThuocSelected) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/${loaiThuocSelected}/thuoc`
  );
  const data = await response.json();
  return data;
};
export const themThuoc = async (data) => {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/${data.maLoai}/thuoc`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenThuoc: data.tenThuoc,
        lieuLuong: data.lieuLuong,
        congDung: data.congDung,
        donViTinh: data.donViTinh,
        quyCachDongGoi: data.quyCachDongGoi,
        tacDungPhu: data.tacDungPhu,
        huongDanSuDung: data.huongDanSuDung,
        soLuong: 0,
        isThuocKeDon: data.thuocKeDon,
        images: [],
        dsDoiTuong: [],
        thuocKeDon: false,
        moTa: data.moTa,
      }),
    }
  );
  if (res.ok) {
    toast.success("Thêm thuốc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    const thuocs = await getAllThuoc();
    return thuocs;
  } else {
    toast.error("Thêm thuốc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    return;
  }
};
export const xoaThuoc = async (data) => {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/thuoc/${data}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    toast.success("Xóa thuốc thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    console.log("ok");
  } else {
    toast.error("Xóa thuốc không thành công", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    console.log("not ok");
  }
  const thuoc = await getAllThuoc();
  return thuoc;
};
export const getAllThuocTheoLoai = async (id) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/khach-hang/xem-thuoc/loai-thuoc/${id}/thuoc`
  );
  const data = await response.json();
  return data;
};
