import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/UserContextProvider";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./views/home/Home";
import { Me } from "./views/me/Me";
import { MyNavbar } from "./components/navbar/MyNavbar";
import { Footer } from "./components/footer/Footer";
import { NotFound } from "./views/notFound/NotFound";
function App() {
  console.log("ROOT => App.js");
  const { SetToken } = useContext(UserContext);
  // * blocco accesso google
  useEffect(() => {
    // prendo il token dall'url
    const JwtToken = new URLSearchParams(window.location.search).get("token");
    // se esiste salvo il token nel localStorage, nel context e redirect alla home
    if (JwtToken) {
      localStorage.setItem("token", JwtToken);
      SetToken(JwtToken);
    }
  }, [SetToken]);
  // * fine blocco accesso google
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
