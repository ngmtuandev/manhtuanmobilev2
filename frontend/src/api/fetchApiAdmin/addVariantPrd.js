import axios from "../../untils/configAxios";

const addVariantApi = (data, id) =>
  axios({
    url: `/product/add-variant/${id}`,
    data,
    method: "put",
  });

export default addVariantApi;
