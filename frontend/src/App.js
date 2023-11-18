import React from "react";
import { Route, Routes } from "react-router-dom";
import path from "./untils/path";
import {
  DetailProduct,
  Home,
  Login,
  Public,
  ProductsCategory,
} from "./pages/publicPage/index";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import actionFetchCategory from "./store/actionTypeAsync";
import actionTypeAsyncLogin from "./store/actionTypeAsyncLogin";
import Register from "./pages/publicPage/Register";
import {
  CreateProduct,
  Dashboard,
  LayoutAdmin,
  ManageUser,
} from "./component/AdminComponent/index";
import {
  LayoutMember,
  ManageCart,
  ManageHistoryCart,
  ManageUserMember,
  ManageWhiteList,
  Checkout,
} from "./component/MemberComponent/index";
import ManageProducts from "./component/AdminComponent/ManageProducts";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionFetchCategory());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(actionTypeAsyncLogin());
    }, 1000);
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path={path.PUBLIC} element={<Public></Public>}>
            <Route path={path.HOME} element={<Home></Home>}></Route>
            <Route
              path={path.PRODUCTS__CATEGORY}
              element={<ProductsCategory></ProductsCategory>}
            ></Route>
            <Route
              path={path.PRODUCT_CATEGORY__ID__NAME}
              element={<DetailProduct></DetailProduct>}
            ></Route>
          </Route>
          <Route path={path.PUBLIC_ADMIN} element={<LayoutAdmin></LayoutAdmin>}>
            <Route
              path={`${path.PUBLIC_ADMIN}${path.MANAGE_USER_ADMIN}`}
              element={<ManageUser></ManageUser>}
            ></Route>
            <Route
              path={`${path.PUBLIC_ADMIN}${path.DASBOARD_ADMIN}`}
              element={<Dashboard></Dashboard>}
            ></Route>
            <Route
              path={`${path.PUBLIC_ADMIN}${path.CREATE_PRODUCT_ADMIN}`}
              element={<CreateProduct></CreateProduct>}
            ></Route>
            <Route
              path={`${path.PUBLIC_ADMIN}${path.MANAGE_PRODUCT_ADMIN}`}
              element={<ManageProducts></ManageProducts>}
            ></Route>
          </Route>
          <Route
            path={path.PUBLIC_MEMBER}
            element={<LayoutMember></LayoutMember>}
          >
            <Route
              path={`${path.PUBLIC_MEMBER}${path.MANAGE_USER_MEMBER}`}
              element={<ManageUserMember></ManageUserMember>}
            ></Route>
            <Route
              path={`${path.PUBLIC_MEMBER}${path.MANAGE_BUY_HISTORY_MEMBER}`}
              element={<ManageHistoryCart></ManageHistoryCart>}
            ></Route>
            <Route
              path={`${path.PUBLIC_MEMBER}${path.MANAGE_WHITELIST_MEMBER}`}
              element={<ManageWhiteList></ManageWhiteList>}
            ></Route>
            <Route
              path={`${path.PUBLIC_MEMBER}${path.MANAGE_CART_MEMBER}`}
              element={<ManageCart></ManageCart>}
            ></Route>
          </Route>
          <Route path={path.LOGIN} element={<Login></Login>}></Route>
          <Route path={path.PAYMENT} element={<Checkout></Checkout>}></Route>
          <Route path={path.REGISTER} element={<Register></Register>}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
