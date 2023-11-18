import axios from "../../untils/configAxios";
const fetchCreateOrder = (data) =>
  axios({
    url: "/order/create-order",
    method: "post",
    data,
  });

export default fetchCreateOrder;
