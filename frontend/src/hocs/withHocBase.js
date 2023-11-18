import React from "react";
import { useDispatch } from "react-redux";
const withHocBase = (Component) => (props) => {
  const dispatch = useDispatch();
  return <Component {...props} dispatch={dispatch}></Component>;
};

export default withHocBase;
