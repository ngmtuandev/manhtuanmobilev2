import axios from "../untils/configAxios";

const fetchApiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data
  });

export default fetchApiLogin;
