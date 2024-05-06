import { useQuery, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setLogin, setLogout, setGeneralAccountInfo } from "../redux/accountSlice";
import { getAlbums, login, logout, register, updateProfile } from "../api";

export const useAlbums = () => {
  return useQuery({
    queryKey: [],
    queryFn: getAlbums,
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      dispatch(setLogin(user));
    },
  });
};

export const useRegister = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      dispatch(setLogin(user));
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(setLogout());
    },
  });
};

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      dispatch(setGeneralAccountInfo(user));
    },
  });
};
