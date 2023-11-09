import axios from "../../untils/configAxios";

const fetchApiUsers = () =>
  axios({
    url: "/user/users",
    method: "get",
    // headers: {
    //   author: `Bearer ${token}`,
    // },
  });

export default fetchApiUsers;
