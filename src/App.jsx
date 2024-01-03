import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";
import { MainComponent } from "./components/MainComponents/MainComponent";
import { MainPage } from "./components/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { useAuthenticateUserMutation } from "./redux/userApi";
import { login } from "./redux/userSlice";
import { CreateComponent } from "./components/MainComponents/CreateComponent";



function App() {
  const isAuth = useSelector(store => store.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [authenticateUser, {data, isError, isSuccess, isLoading, error}] = useAuthenticateUserMutation();

  useLayoutEffect(() => {
    const x = localStorage.getItem("token") || "";
    console.log("Berear " + x);
    authenticateUser({token: localStorage.getItem("token") || ""});
  }, []);

  if (isSuccess) {
    dispatch(login(data.user));
    localStorage.setItem("token", data.token);
  }

  const location = useLocation();
  const currentPath = location.pathname;
  sessionStorage.setItem("pathname", currentPath);

  return (
    isLoading ? 
    <>
      <div className="wrapper">Loading...</div>
    </> : 
    <>
      <Routes>
        <Route path="/task-mananger/*" element={isAuth ? <MainPage/> : <Navigate to="/login"/>}>
          <Route path="main" element={<MainComponent/>}/>
          <Route path="create" element={<CreateComponent/>}/>
          {/* <Route path="settings" element={}/> */}
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
