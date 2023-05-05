import { getAllDonHang } from "@/api/donHangApi";

async function fetchData(data) {
  const res = await getAllDonHang(data);
  return res.content;
}
export const LocDonHangTheoTrangThai = async (page, dhsl) => {
  const arr = await fetchData(page);
  if (dhsl === "All") {
    return arr;
  } else {
    const arr1 = await arr.filter((temp) => temp.trangThaiDonHang === dhsl);

    return arr1;
  }
};
