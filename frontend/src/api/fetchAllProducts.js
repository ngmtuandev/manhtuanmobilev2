import axios from "../untils/configAxios";

export const fetchProducts = async (params) => {
  const rs = await axios.get("/product/all-product", {
    params: {
      limit: params.limit,
      page: params.page,
      // "tags[]": params.tags, // tags[]='name_tag'&tags[]='name_tag' <=> "tags[]" : ['name_tag', 'name_tag',...]
    },
  });
  console.log("rs test ne 4234324324324324", rs);
  return rs;
};
