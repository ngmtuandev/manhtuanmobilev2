import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from "../../../untils/icons";
const BreadCumbs = ({ category, title }) => {
  const { FaChevronRight } = icons;
  const routes = [
    // path to component match
    { path: "/", breadcrumb: "Trang chủ" },
    { path: "/:category", breadcrumb: category },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  // console.log('breadcrumb befor >>>>>>', useBreadcrumbs())
  // console.log('breadcrumb after >>>>>', breadcrumb)
  return (
    <div className="flex items-center">
      {breadcrumb
        ?.filter((el) => !el?.match?.route === false)
        .map(({ match, breadcrumb }, index, self) => {
          // console.log('index >>>', index)
          // console.log('breadcrumb >>>', breadcrumb)
          // console.log('self >>>', self)
          // console.log('match >>>', match)
          // match.pathname is a path in routes
          return (
            <Link key={match?.pathname} to={match?.pathname}>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 font-serif cursor-pointer hover:text-colorCyan">
                  {breadcrumb}
                </span>
                {index !== self.length - 1 && (
                  <div className="mx-2">
                    <FaChevronRight color="gray" size={12}></FaChevronRight>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default BreadCumbs;
