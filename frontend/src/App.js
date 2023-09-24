import React from "react";
import { Route, Routes } from "react-router-dom";
import path from "./untils/path";
import { Home, Login, Public } from "./pages/publicPage/index";
import "./index.css";
function App() {
  return (
    <div className="min-h-screen bg-bgDarkLight">
      <Routes>
        <Route path={path.PUBLIC} element={<Public></Public>}>
          <Route path={path.HOME} element={<Home></Home>}></Route>
          <Route path={path.LOGIN} element={<Login></Login>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
