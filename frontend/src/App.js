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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import actionFetchCategory from "./store/actionTypeAsync";
import actionTypeAsyncLogin from "./store/actionTypeAsyncLogin";
import Register from "./pages/publicPage/Register";
import {
  Dashboard,
  LayoutAdmin,
  ManageUser,
} from "./component/AdminComponent/index";
import { LayoutMember } from "./component/MemberComponent/index";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionFetchCategory());
  }, []);
  useEffect(() => {
    dispatch(actionTypeAsyncLogin());
  }, []);
  return (
    <div className="min-h-screen bg-bgDarkLight">
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
        </Route>
        <Route
          path={path.PUBLIC_MEMBER}
          element={<LayoutMember></LayoutMember>}
        ></Route>
        <Route path={path.LOGIN} element={<Login></Login>}></Route>
        <Route path={path.REGISTER} element={<Register></Register>}></Route>
      </Routes>
    </div>
  );
}

export default App;
