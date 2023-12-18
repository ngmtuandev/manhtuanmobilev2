// import React from "react";
// import PaginationItem from "./PaginationItem";

// const RangePagination = (totalProduct, totalProductInPage) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalProduct / totalProductInPage); i++) {
//     pageNumbers.push(i);
//   }
//   return pageNumbers;
// };

// const Paginations = ({ totalPrds, prdsPerPage, onChangePage, pageCurrent }) => {
//   const paginations = RangePagination(totalPrds, prdsPerPage);
//   return (
//     <div className="flex gap-8 justify-end pb-[40px] mt-8">
//       {paginations.map((el) => {
//         return (
//           <div onClick={() => onChangePage(el)}>
//             {/* <PaginationItem
//               pageCurrent={pageCurrent}
//               page={el}
//             ></PaginationItem> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Paginations;
