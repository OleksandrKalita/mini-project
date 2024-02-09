import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";
import { MainComponent } from "./components/MainComponents/MainComponent";
import { MainPage } from "./components/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { useAuthenticateUserMutation, useRefreshTokenMutation } from "./redux/authApi";
import { login } from "./redux/userSlice";
import { CreateComponent } from "./components/MainComponents/CreateComponent";
import { SettingsComponent } from "./components/MainComponents/SettingsComponent.jsx";




function App() {
  const isAuth = useSelector(store => store.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [authenticateUser, {data, isError, isSuccess, isLoading, error}] = useAuthenticateUserMutation();
  const [refreshToken, {data: refreshData, isSuccess: refreshSuccess}] = useRefreshTokenMutation();

  useLayoutEffect(() => {
    authenticateUser({token: localStorage.getItem("token") || ""});
  }, []);

  if (isSuccess) {
    dispatch(login(data.user));
  }
  var firstQuery = true;
  if (isError) {
    if (error.status === 401 && firstQuery) {
      firstQuery = false;
      fetch("http://localhost:3201/api/auth/refresh", {
        method: "POST",
        credentials: "include"
      })
      .then(data => data.json())
      .then(data => {
        localStorage.setItem("token", data.accessToken);
        console.log(data);
        authenticateUser({token: localStorage.getItem("token") || ""});
      })

      // .catch(data)
    }
  }

  // if (refreshSuccess) {
  //   localStorage.setItem("token", refreshData.token);
  //   authenticateUser({token: localStorage.getItem("token") || ""});
  // }
  // const location = useLocation();
  // const currentPath = location.pathname;
  // sessionStorage.setItem("pathname", currentPath);

  return (
    isLoading ? 
    <>
      <div className="wrapper"></div>
    </> : 
    <>
      <Routes>
        <Route path="/task-mananger/*" element={isAuth ? <MainPage/> : <Navigate to="/login"/>}>
          <Route path="main" element={<MainComponent/>}/>
          <Route path="create" element={<CreateComponent/>}/>
          <Route path="account-settings" element={<SettingsComponent/>}/>
          <Route path="*" element={<Navigate to="main"/>}/>
        </Route>
        <Route path="/login" element={isAuth ? <Navigate to="/task-mananger"/> : <LoginPage/>}/>
        <Route path="/registration" element={isAuth ? <Navigate to="/task-mananger"/> : <RegistrationPage/>}/>
        <Route path="*" element={<Navigate to="/task-mananger"/>}/>
      </Routes>
    </>
  );
}

export default App;
