import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "./common/Footer";
import NotFound from "./common/NotFound";
import Home from "./Home";
import { UserContext } from "./contexts/UserContext";
import Login from "./Login";
import Forgot from "./Forgot";
import Account from "./Account";
import { forgotPassword, login, resetPassword, signup } from "../services/authService";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./common/Navbar";
import { getMe } from "../services/UsersService";
import ResetPassword from "./ResetPassword";
import { getAllProducts } from "../services/productServices";
import AddProduct from "./AddProdduct";
import EditProduct from "./EditProdduct";
import Navs from "./common/Navs";
import DownloadLinkPage from "./DownloadLinkPage";
import Recharge from "./Recharge";
import { RechargeContext } from "./contexts/rechargeContact";
const Main = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [editProduct, setEditProduct] = useState();
  const [rechargeProd, setRechargeProd] = useState();

  
  useEffect(() => {
    getMeHandler();
    return () => { };
  }, []);

  const rechargeProdHandler=(prod)=>{
setRechargeProd(prod);
  }

  
  const loginHandler = async (user) => {
    try {
      const { data } = await login(user);
      localStorage.setItem("jwt", data.token);
      toast.success("logged in successfully !!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      // history.push('/');
      window.location = "/";
    } catch (error) {
      toast.error("Incorrect username or password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  
  const setEditProductHandler=(prod)=>{
    setEditProduct(prod);
    history.push('/edit');
  }
  const getMeHandler = async () => {
    const { data } = await getMe();
    setUser(data.data);
  };
 

  const forgotHandler = async (email) => {
    const data = await forgotPassword(email)
    if (data.data.status === 'success')
      toast.success("Email successfully sent Please check your mail");
    else {
      toast.error(data.data.message);
      history.push("/");
    }
  };
 
  
  const resetPasswordHandler = async (values) => {
    const { password, confirmPassword, token } = values;
    console.log(values);
    try {
      await resetPassword({ password, confirmPassword }, token);
      toast.success(" Password Reset Successfully !!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        toast.success(" Login with New Password !!", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Invalid token !!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  return (
    <UserContext.Provider value={{ user: user }}>
          <RechargeContext.Provider value={{ rechargeProd,rechargeProdHandler }}>
            <div>
              <ToastContainer style={{ width: "322px" }} />
              <Navs />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => <Home editProduct={setEditProductHandler} {...props} />}
                />
                <Route
                  exact
                  path="/edit"
                  render={(props) => (
                    <EditProduct product={editProduct}  {...props} />
                  )}
                />
                 <Route
                  exact
                  path="/add"
                  render={(props) => (
                    <AddProduct onLogin={loginHandler} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/download/:id/:name"
                  render={(props) => (
                    <DownloadLinkPage  {...props} />
                  )}
                />
                <Route
                  exact
                  path="/recharge"
                  render={(props) => (
                    <Recharge  {...props} />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <Login onLogin={loginHandler} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/resetPassword/:token"
                  render={(props) => (
                    <ResetPassword onResetPassword={resetPasswordHandler} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/forgot"
                  render={(props) => (
                    <Forgot onForgot={forgotHandler} {...props} />
                  )}
                />
                <Route
                  path="/account"
                  render={(props) => (
                    <Account onForgot={forgotHandler} {...props} />
                  )}
                />
                
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
            </RechargeContext.Provider>
    </UserContext.Provider>
  );
};

export default Main;
