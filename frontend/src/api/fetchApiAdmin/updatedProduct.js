import axios from "../../untils/configAxios";

const fetchUpdateProduct = (id, data) =>
  axios({
    url: `/product/${id}`,
    data,
    method: "put",
  });

export default fetchUpdateProduct;
