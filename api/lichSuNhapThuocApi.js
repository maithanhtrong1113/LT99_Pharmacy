export const lichSuNhapThuoc = async (id) => {
  const response = await fetch(
    `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/thuoc/${id}/lich-su-nhap-thuoc`
  );
  if (response.status === 204) return [];
  const data = await response.json();

  return data;
};
