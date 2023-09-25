import axios from "../untils/configAxios";

const getApiCategory = () =>
  axios({
    url: "/category/",
    method: "get",
  });

export default getApiCategory;
