import api from "../api/axios";

export interface Transaction {
  id: number | string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category?: string;
  description?: string;
  date: string;
}

export interface TransactionResponse {
  items: Transaction[];
  total?: number;
  page?: number;
  perPage?: number;
}

export const getTransactions = async (params?: Record<string, any>) => {
  const res = await api.get("/transactions", { params });
  return res.data;
};

export const getTransactionById = async (id: number | string) => {
  const res = await api.get(`/transactions/${id}`);
  return res.data;
};

export const createTransaction = async (payload: Partial<Transaction>) => {
  const res = await api.post("/transactions", payload);
  return res.data;
};

export const updateTransaction = async (id: number | string, payload: Partial<Transaction>) => {
  const res = await api.put(`/transactions/${id}`, payload);
  return res.data;
};

export const deleteTransaction = async (id: number | string) => {
  await api.delete(`/transactions/${id}`);
};

export const getSummary = async (from?: string, to?: string) => {
  const res = await api.get("/transactions/summary", { params: { from, to } });
  return res.data;
};

