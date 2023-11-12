import getApiProduct from "../../api/getApiProduct";

export const fetchProducts = async (params) => {
  const rs = await getApiProduct(params);
  return rs.data;
};
