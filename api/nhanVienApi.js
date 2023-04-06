export const getNhanVienTheoCaLamViec = async (maCaLam) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/ca-lam-viec/${maCaLam}`
  );
  const data = await response.json();
  return data;
};
export const getAllNhanVien = async (maCaLam) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/danh-sach-nhan-vien`
  );
  const data = await response.json();
  return data;
};
