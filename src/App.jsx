import { Navigate, Route, Routes } from "react-router";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";
import { MainComponent } from "./components/MainComponents/MainComponent";
import { MainPage } from "./components/MainPage";



function App() {
  return (
    <>
      <Routes>
        <Route path="/task-mananger/*" element={<MainPage/>}>
          <Route path="main" element={<MainComponent/>}/>
          {/* <Route path="settings" element={}/> */}
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/registration" element={<RegistrationPage/>}/>
        <Route path="*" element={<Navigate to="/task-mananger"/>}/>
      </Routes>
    </>
  );
}

export default App;
