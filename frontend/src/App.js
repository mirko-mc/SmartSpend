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
import { AllTransactions } from "./views/transactions/AllTransactions";
import { TransactionDetails } from "./components/transaction/TransactionDetails";
function App() {
  console.log("ROOT => App.js");
  /*
  '/api/v1/auth/register'
  '/api/v1/user/:userId'

  '/api/v1/category'
  '/api/v1/category/:categoryId'

  '/api/v1/paymentMethod'
  '/api/v1/paymentMethod/:paymentMethodId'
  */
  return (
    <Router>
      <MyNavbar />
      <Routes>
        {/* rotte PROTETTE */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<Me />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<AllTransactions />} />
          <Route path="/transaction/:transactionId" element={<TransactionDetails />} />
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
