import axios from "../../untils/configAxios";

const fetchDeleteUsers = (id) =>
  axios({
    url: `/user/${id}`,
    method: "delete",
  });

export default fetchDeleteUsers;
