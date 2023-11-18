import axios from "../../untils/configAxios";

const apiDeleteCart = (data) =>
  axios({
    url: `/user/cart/`,
    data,
    method: "delete",
  });

export default apiDeleteCart;
