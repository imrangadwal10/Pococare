import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../context/AuthContext";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const { isAuth, setValue, value, setIsAuth } = useContext(context);

  const config = {
    headers: {
      token: isAuth.token,
    },
  };

  const refresh = {
    headers: {
      token: isAuth.refreshToken,
    },
  };

  if (isAuth.login) {
    axios
      .get("http://localhost:8080/home", config)
      .then((response) => {
        if (response.data === "home page") {
          setValue(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          axios
            .post("http://localhost:8080/user/refresh",refresh)
            .then((res) => {
              setIsAuth({...isAuth,token:res.data.newToken})
              setValue(true);
            });
        }

        
      });
  }

  if (!value) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
