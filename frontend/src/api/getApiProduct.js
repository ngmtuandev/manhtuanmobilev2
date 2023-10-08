import axios from "../untils/configAxios";

const getApiProduct = (params) => 
    axios({
        url: '/product/all-product',
        method: 'get',
        params: params
    })


export default getApiProduct