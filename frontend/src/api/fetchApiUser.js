import axios from "../untils/configAxios";

const fetchApiUser = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

export default fetchApiUser;