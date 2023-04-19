export const getChiTietDonHang = async (maDonHang) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online/${maDonHang}`
  );
  if (response.status === 204) return {};
  const data = await response.json();

  return data;
};
export const getAllDonHang = async (pageNo) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online?pageNo=${pageNo}`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
export const acpDonHang = (maDonHang) => {
  const response = fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online/${maDonHang}/cap-nhat-trang-thai`
  );
  return response;
};
export const deniedDonHang = (maDonHang) => {
  const response = fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online/${maDonHang}/cap-nhat-trang-thai?deny= `
  );
  return response;
};
