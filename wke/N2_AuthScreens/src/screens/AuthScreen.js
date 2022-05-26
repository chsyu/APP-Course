import { useSelector } from "react-redux";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { selectLogin } from "../redux/accountSlice";

const AuthScreen = () => {
   const login = useSelector(selectLogin);
   return (
      login.hasAccount
      ? <LoginScreen />
      : <RegisterScreen />
   );
};

export default AuthScreen;
