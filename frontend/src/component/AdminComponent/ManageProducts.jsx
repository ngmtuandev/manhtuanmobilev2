import React, { useEffect, useState } from "react";
import getApiProduct from "../../api/getApiProduct";
import { formatDateTime } from "../../untils/fnSuppport";
import { useDispatch, useSelector } from "react-redux";
import { acionShowModel } from "../../store/modelSlice";
import ModelEdit from "./ModelEdit";
import swal from "sweetalert";
import fetchDeleteProduct from "../../api/fetchApiAdmin/deleteProduct";
import { Spinner } from "@material-tailwind/react";
import useProduct from "../../hook/hook-product/useProduct";
import ModelAddVarient from "./ModelAddVarient";
const ManageProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productEdit, setProductEdit] = useState(null);
  const [addVariant, setAddVariant] = useState(null);
  const [isShowModelAdd, setIsShowModelAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isShowModel } = useSelector((state) => state.model);

  const { deleteProduct, products } = useProduct();
  console.log("products", products);
  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   const rs = await getApiProduct();
  //   setIsLoading(false);
  //   if (rs) {
  //     setAllProducts(rs?.data);
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, [isEdit, isShowModel]);
  const handleDeleteProduct = (id) => {
    swal("Bạn muốn xóa sản phẩm này ?").then(async () => {
      deleteProduct.mutate(id);
      // setIsEdit(!isEdit);
    });
  };
  return (
    <div>
      {isLoading ? (
        <div className="w-[100%] h-[100%] flex justify-center items-center mt-[25%]">
          <Spinner color="blue" className="h-12 w-12" />
        </div>
      ) : (
        <div className="relative">
          {isShowModelAdd && (
            <ModelAddVarient
              addVariant={addVariant}
              setIsShowModelAdd={setIsShowModelAdd}
            ></ModelAddVarient>
          )}
          <div className="fixed z-50 mb-16 shadow-xl w-full h-[40px] bg-white">
            <span>Quản lý sản phẩm</span>
          </div>
          {isShowModel && (
            <ModelEdit
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              productEdit={productEdit}
            ></ModelEdit>
          )}

          <div className=" mt-4 w-full px-[40px]">
            {/* <div className="absolute h-[800px] w-[100%] bg-red-800"></div> */}
            <div class="flex flex-col w-full">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                      <thead class="border-b mb-4 bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                          <th scope="col" class="px-6 py-4">
                            #
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Ảnh
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Thương hiệu
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Tên
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Giá
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Số lượng
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Đã bán
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Danh mục
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Ngày tạo
                          </th>
                          <th scope="col" class="px-6 py-4">
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-20">
                        {products?.length > 0 &&
                          products?.map((el, index) => {
                            return (
                              <tr
                                key={el?._id}
                                class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                              >
                                <td class="whitespace-nowrap px-6 py-4 font-medium">
                                  {index + 1}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  <img
                                    className="w-[50px] object-cover"
                                    src={el?.thumb}
                                  ></img>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {el?.brand}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {el?.title}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {el?.price}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {el?.quantity}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {el?.selled}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {el?.category}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                  {formatDateTime(el?.createdAt)}
                                </td>
                                <td class="whitespace-nowrap gap-3 flex-col justify-center items-center px-6 py-4">
                                  <div className="w-[70px] my-2 h-[30px] bg-red-500 rounded-md flex justify-center items-center text-gray-50">
                                    <button
                                      onClick={() =>
                                        handleDeleteProduct(el?._id)
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                  <div className="w-[70px] my-2 h-[30px] bg-blue-500 rounded-md flex justify-center items-center text-gray-50">
                                    <button
                                      onClick={() => {
                                        setProductEdit(el);
                                        dispatch(
                                          acionShowModel({ isShowModel: true })
                                        );
                                      }}
                                    >
                                      Chỉnh sửa
                                    </button>
                                  </div>
                                  <div className="w-[70px] my-2 h-[30px] bg-green-500 rounded-md flex justify-center items-center text-gray-50">
                                    <button
                                      onClick={() => {
                                        setAddVariant(el);
                                        setIsShowModelAdd(true);
                                      }}
                                    >
                                      Biến thể
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
