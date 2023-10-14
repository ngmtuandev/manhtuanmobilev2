import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


// CONFIG TRƯỚC KHI GỬI API --> thêm bearer token nếu đã đăng nhập trước khi gửi api
instance.interceptors.request.use(function(config) {
  // config : set lại dữ liệu data truyền lên backend --> thêm bearer token lên data api để truyền lên
  let localStorageData = window.localStorage.getItem('persist:USER_LOGIN') // có => đã đăng nhập => thực hiện tiếp theo
  if (localStorageData && typeof localStorageData === 'string') {
    localStorageData = JSON.parse(localStorageData)
    const accessTokenLogin = JSON.parse(localStorageData?.token)
    // console.log('accessTokenLogin >>>>>', accessTokenLogin)
    config.headers = {author : `Bearer ${accessTokenLogin}`}
    // console.log('check config in axios >>>>>', config)
    return config // trả về data mới để gửi lên backend
  } else return config
})




// DỮ LIỆU TRẢ VỀ
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // response chính là những có nó trả về trong option axios
    // data axios trả về luôn có dạng : config: {}, data: {}. headers: {} .... ==> data luôn nằm trong data => response.data luôn
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.data;
  }
);

export default instance;
