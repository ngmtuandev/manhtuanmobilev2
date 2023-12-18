import axios from "../untils/configAxios";

const fetchApiRatingProduct = (data, token) =>
  axios({
    url: "/product/ratings",
    method: "put",
    data,
    headers: {
      author: `Bearer ${token}`,
    },
    
  });

export default fetchApiRatingProduct;
