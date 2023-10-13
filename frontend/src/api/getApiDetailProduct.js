import axios from "../untils/configAxios";

const getApiDetailProduct = (params) =>
  axios({
    url: `/product/${params}`,
    method: "get",
  });

export default getApiDetailProduct;