import React from "react";
import { Route, Routes } from "react-router-dom";
import path from "./untils/path";
import { DetailProduct, Home, Login, Public } from "./pages/publicPage/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import actionFetchCategory from "./store/actionTypeAsync";
import actionTypeAsyncLogin from "./store/actionTypeAsyncLogin";
import Register from "./pages/publicPage/Register";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionFetchCategory());
  }, []);
  useEffect(() => {
    dispatch(actionTypeAsyncLogin())
  }, [])
  return (
    <div className="min-h-screen bg-bgDarkLight">
      <Routes>
        <Route path={path.PUBLIC} element={<Public></Public>}>
          <Route path={path.HOME} element={<Home></Home>}></Route>
          <Route path={path.PRODUCT_CATEGORY__ID__NAME} element={<DetailProduct></DetailProduct>}></Route>
        </Route>
          <Route path={path.LOGIN} element={<Login></Login>}></Route>
          <Route path={path.REGISTER} element={<Register></Register>}></Route>
      </Routes>
    </div>
  );
}

export default App;
