// src/features/dashboard/Dashboard.tsx
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  getSummary,
  getTransactions,
  type Transaction,
} from "../../services/transactionService";
import { format, subMonths } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Summary {
  incomes: number;
  expenses: number;
}

interface TransactionResponse {
  items: Transaction[];
}

function KPICard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <Paper sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: color ?? "text.primary" }}>
        ${value.toFixed(2)}
      </Typography>
    </Paper>
  );
}

export default function Dashboard() {
  // summary
  const summaryQ = useQuery<Summary>({
    queryKey: ["summary"],
    queryFn: () => getSummary(),
  });

  // transactions (traemos muchas para construir series)
  const txQ = useQuery<TransactionResponse>({
    queryKey: ["transactions"],
    queryFn: () => getTransactions({ perPage: 1000 }),
  });

  const summary = summaryQ.data ?? { incomes: 0, expenses: 0 };
  const transactions: Transaction[] = txQ.data?.items ?? [];

  const months = Array.from({ length: 6 }).map((_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return format(date, "yyyy-MM");
  });

  const series = months.map((m) => {
    const [y, mo] = m.split("-");
    const monthTx = transactions.filter((t) => t.date.startsWith(`${y}-${mo}`));
    const incomes = monthTx.filter((t) => t.type === "INCOME").reduce((a, b) => a + b.amount, 0);
    const expenses = monthTx.filter((t) => t.type === "EXPENSE").reduce((a, b) => a + b.amount, 0);
    return {
      month: format(new Date(Number(y), Number(mo) - 1, 1), "MMM yyyy"),
      incomes,
      expenses,
    };
  });

  const pieData = [
    { name: "Ingresos", value: summary.incomes ?? 0 },
    { name: "Gastos", value: summary.expenses ?? 0 },
  ];
  const COLORS = ["#16a34a", "#ef4444"];

  return (
    <Box>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 700 }}>
        Resumen
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 16,
          mb: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
        }}
      >
        <KPICard title="Ingresos" value={summary.incomes ?? 0} color="#16a34a" />
        <KPICard title="Gastos" value={summary.expenses ?? 0} color="#ef4444" />
        <KPICard title="Balance" value={(summary.incomes ?? 0) - (summary.expenses ?? 0)} color="#0ea5a4" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
        }}
      >
        <Paper sx={{ p: 2, minHeight: 380 }}>
          <Typography variant="h6" mb={2}>
            Ingresos y Gastos (últimos 6 meses)
          </Typography>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={series}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incomes" stroke="#16a34a" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper sx={{ p: 2, minHeight: 380 }}>
          <Typography variant="h6" mb={2}>
            Distribución Ingresos vs Gastos
          </Typography>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
}
