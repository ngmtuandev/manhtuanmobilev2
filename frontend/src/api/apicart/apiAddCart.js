import axios from "../../untils/configAxios";

const apiAddCart = (data, pid) =>
  axios({
    url: `/user/cart/${pid}`,
    data,
    method: "put",
  });

export default apiAddCart;
