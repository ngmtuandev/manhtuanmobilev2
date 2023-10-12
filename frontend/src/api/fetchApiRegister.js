import axios from "../untils/configAxios";

const fetchApiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data
  });

export default fetchApiRegister;
