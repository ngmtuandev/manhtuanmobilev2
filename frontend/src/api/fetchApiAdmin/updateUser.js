import axios from "../../untils/configAxios";

const apiUpdateUser = (data) =>
  axios({
    url: "/user/update",
    data,
    method: "put",
  });

export default apiUpdateUser;
