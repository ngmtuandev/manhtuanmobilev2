import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "../../api/fetchAllProducts";
import fetchDeleteProduct from "../../api/fetchApiAdmin/deleteProduct";
import fetchUpdateProduct from "../../api/fetchApiAdmin/updatedProduct";
import { acionShowModel } from "../../store/modelSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const useProduct = ({ page, limit }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["Products", { page, limit }],
    queryFn: () => fetchProducts({ page, limit }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      return await fetchDeleteProduct(id);
    },
    onSuccess: async () => {
      console.log(" delete success ");
      queryClient.invalidateQueries(["Products"]);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (id, data) => {
      console.log("data query >>>>", data);
      return await fetchUpdateProduct(id, data);
    },
    onSuccess: async () => {
      console.log(" update success ");
      queryClient.invalidateQueries(["Products"]);
      dispatch(acionShowModel({ isShowModel: false }));
      swal("Cập nhập sản phẩm thành công");
    },
  });

  return {
    products: data,
    isLoadingProduct: isLoading,
    deleteProduct,
    updateProduct,
  };
};

export default useProduct;
