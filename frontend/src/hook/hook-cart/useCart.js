import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiAddCart from "../../api/apicart/apiAddCart";
const useCart = () => {
  const queryClient = useQueryClient();
  const addCart = useMutation({
    mutationFn: async (data, pid) => {
      console.log("data", data);
      return await apiAddCart(data, pid);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
  return {
    addCart,
  };
};

export default useCart;
