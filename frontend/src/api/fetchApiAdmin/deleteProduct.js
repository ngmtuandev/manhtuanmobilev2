import axios from "../../untils/configAxios";

const fetchDeleteProduct = (id) =>
  axios({
    url: `/product/${id}`,
    method: "delete",
  });

export default fetchDeleteProduct;
