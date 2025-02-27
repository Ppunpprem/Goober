import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import LogPage from "./components/Log_and_Regist";
import InfoRegistPage from "./components/Info_Regist_Page";
import HomePage from "./components/HomePage";
import H_ALog_Page from "./components/H_ALog_Page";
import Location_Popup from "./components/Location_Info";
import BadgesPage from "./components/Badges_Page";
import EditPage from "./components/E_ALog_Page";
import "./App.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider> 
      <Router>
        <MainLayout />
      </Router>
    </UserProvider>
  );
}

function MainLayout() {
  const location = useLocation();
  
  const navBar2Routes = ["/home_after_login", "/location_info", "/badges", "/edit"];
  const isNavBar2 = navBar2Routes.includes(location.pathname);

  return (
    <>
      {isNavBar2 ? <NavBar2 /> : <NavBar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/log-regist" element={<LogPage />} />
          <Route path="/info-regist" element={<InfoRegistPage />} />
          <Route path="/home_after_login" element={<H_ALog_Page key={location.pathname} />} />
          <Route path="/location_info" element={<Location_Popup />} />
          <Route path="/badges" element={<BadgesPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
