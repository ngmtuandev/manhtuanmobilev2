import axios from "../../untils/configAxios";

const fetchEditUsers = (data) =>
  axios({
    url: "/user/update",
    data,
    method: "put",
  });

export default fetchEditUsers;
