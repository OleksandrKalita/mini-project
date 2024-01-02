import { Navigate, Route, Routes } from "react-router";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";
import { MainComponent } from "./components/MainComponents/MainComponent";
import { MainPage } from "./components/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { useAuthenticateUserMutation } from "./redux/userApi";
import { login } from "./redux/userSlice";



function App() {
  const isAuth = useSelector(store => store.user.isAuth);
  const dispatch = useDispatch();
  
  const [authenticateUser, {data, isError, isSuccess}] = useAuthenticateUserMutation();

  useLayoutEffect(() => {
    authenticateUser({token: localStorage.getItem("token")});
  }, []);

  if (isSuccess) {
    dispatch(login(data.user));
    localStorage.setItem("token", data.token);
  }

  useEffect(() => {
    console.log("effect");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/task-mananger/*" element={isAuth ? <MainPage/> : <Navigate to="/login"/>}>
          <Route path="main" element={<MainComponent/>}/>
          {/* <Route path="settings" element={}/> */}
        </Route>
        <Route path="/login" element={isAuth ? <Navigate to="/task-mananger"/> : <LoginPage/>}/>
        <Route path="/registration" element={isAuth ? <Navigate to="/task-mananger"/> : <RegistrationPage/>}/>
        <Route path="*" element={<Navigate to="/task-mananger"/>}/>
      </Routes>
    </>
  );
}

export default App;
