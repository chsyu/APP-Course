import { useQuery } from "@tanstack/react-query";
import { getUbikeInfo } from "../api";

export const useUbikeInfo = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [],
    queryFn: getUbikeInfo,
  });
  return { data, isLoading, isSuccess };
};
