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
import { ProtectedRoutes } from "./components/routesManage/ProtectedRoutes";
import { Dashboard } from "./views/dashboard/Dashboard";
import { UnprotectedRoutes } from "./components/routesManage/UnprotectedRoutes";
import { Transactions } from "./views/transactions/Transactions";
import { Transaction } from "./components/transaction/Transaction";
function App() {
  console.log("ROOT => App.js");
  return (
    <Router>
      <MyNavbar />
      <Routes>
        {/* rotte PROTETTE */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<Me />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        {/* rotte NON PROTETTE */}
        <Route element={<UnprotectedRoutes />}>
          <Route path="/login" element={<Home />} />
        </Route>
        {/* rotte GUEST */}
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
