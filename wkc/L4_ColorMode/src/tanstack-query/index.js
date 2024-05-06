import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../api";

export const useAlbums = () => {
  return useQuery({
    queryKey: [],
    queryFn: getAlbums,
  });
};


