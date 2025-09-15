import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";
import TransactionsList from "./pages/Transactions/TransactionsList";
import TransactionPage from "./pages/Transactions/TransactionsPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import Reports from "./features/reports/Reports";
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsList />} />
        <Route path="transactions/new" element={<TransactionsPage />} />
        <Route path="transactions/:id/edit" element={<TransactionPage />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
