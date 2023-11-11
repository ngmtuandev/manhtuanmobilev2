import axios from "../../untils/configAxios";

const fetchCreateProduct = (data) =>
  axios({
    url: `/product/create-product`,
    data,
    method: "post",
  });

export default fetchCreateProduct;
