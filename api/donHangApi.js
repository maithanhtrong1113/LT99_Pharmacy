export const getChiTietDonHang = async (maDonHang) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online/${maDonHang}`
  );
  if (response.status === 204) return {};
  const data = await response.json();

  return data;
};
export const getAllDonHang = async () => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
