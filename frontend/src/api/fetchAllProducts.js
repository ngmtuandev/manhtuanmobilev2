import axios from "../untils/configAxios";

const fetchAllProducts = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export default fetchAllProducts;
