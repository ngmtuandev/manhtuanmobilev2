import axios from "axios";
const fetchApiProvince = async () => {
  const rs = await axios.get("https://provinces.open-api.vn/api/p");
  return rs.data;
};

export const fetchApiDistrict = async (id) => {
  const rs = await axios.get(
    `https://provinces.open-api.vn/api/p/${id}?depth=2`
  );
  return rs.data;
};

export const fetchApiLocation = async (id) => {
  const rs = await axios.get(
    `https://provinces.open-api.vn/api/d/${id}?depth=2`
  );
  return rs.data;
};

export default fetchApiProvince;
