import axios from "../untils/configAxios";

const fetchApiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true
  });

export default fetchApiRegister;
