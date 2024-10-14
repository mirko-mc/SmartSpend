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
import { AllTransactions } from "./views/all/AllTransactions";
import { TransactionDetails } from "./components/transaction/TransactionDetails";
import { MyFooter } from "./components/footer/MyFooter";
import { AllCategories } from "./views/all/AllCategories";
import { CategoryDetails } from "./components/categories/CategoryDetails";
import { AllPaymentMethods } from "./views/all/AllPaymentMethods";
import { PaymentMethodDetails } from "./components/paymentMethods/PaymentMethodDetails";
function App() {
  return (
    <Router>
      <MyNavbar />
      <main className="m-0 p-0">
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
            <Route path="categories" element={<AllCategories />}>
              <Route path=":categoryId" element={<CategoryDetails />} />
            </Route>
            {/* METODI DI PAGAMENTO */}
            <Route path="paymentMethods" element={<AllPaymentMethods />}>
              <Route
                path=":paymentMethodId"
                element={<PaymentMethodDetails />}
              />
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
      </main>
      <MyFooter />
    </Router>
  );
}

export default App;
