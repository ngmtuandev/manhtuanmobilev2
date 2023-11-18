import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchApiProvince from "../../api/apiAddress/apiProvince";

const useAddress = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["Address"],
    queryFn: () => fetchApiProvince(),
  });

  return {
    province: data,
    isLoading,
  };
};

export default useAddress;
