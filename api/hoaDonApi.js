export const getAllHoaDon = async (pageNo) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/hoa-don?pageNo=${pageNo}`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
export const getChiTietHoaDon = async (maHoaDon) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/${maHoaDon}`
  );
  if (response.status === 204) return {};
  const data = await response.json();

  return data;
};
