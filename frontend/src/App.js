import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./views/home/Home";
import { Me } from "./views/me/Me";
import { MyNavbar } from "./components/navbar/MyNavbar";
import { NotFound } from "./views/notFound/NotFound";
import { ProtectedRoutes } from "./components/routesManage/ProtectedRoutes";
import { Dashboard } from "./views/dashboard/Dashboard";
import { UnprotectedRoutes } from "./components/routesManage/UnprotectedRoutes";
import { AllTransactions } from "./views/transactions/AllTransactions";
import { SingleTransaction } from "./components/transaction/SingleTransaction";
import { Categories } from "./components/categories/Categories";
import { PaymentMethods } from "./components/paymentMethods/PaymentMethods";
import { TransactionDetails } from "./components/transaction/TransactionDetails";
import { MyFooter } from "./components/footer/MyFooter";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "./context/UserContextProvider";
function App() {
  console.log("ROOT => App.js");
  const { Theme } = useContext(UserContext);
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
          {/* TRANSAZIONI */}
          <Route path="/transactions" element={<AllTransactions />}>
            <Route path=":transactionId" element={<TransactionDetails />} />
          </Route>
          {/* CATEGORIE */}
          <Route path="categories" element={<Categories />}>
            <Route path=":categoryId" element={<Categories />} />
          </Route>
          {/* METODI DI PAGAMENTO */}
          <Route path="paymentMethods" element={<PaymentMethods />}>
            <Route path=":paymentMethodId" element={<PaymentMethods />} />
          </Route>
        </Route>
        {/* rotte NON PROTETTE */}
        <Route element={<UnprotectedRoutes />}>
          <Route path="/login" element={<Home />} />
        </Route>
        {/* rotte GUEST */}
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </Router>
  );
}

export default App;
