import { useEffect, useState } from "react";
import { getTransactions, type TransactionResponse, type Transaction } from "../../services/transactionService";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";

const COLORS = ["#4caf50", "#f44336"];

export default function Reports() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data: TransactionResponse = await getTransactions({ perPage: 1000 });
        setTransactions(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error(err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDownloadCsv = async () => {
    try {
      const response = await api.get("/transactions/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error descargando CSV:", err);
    }
  };

  if (loading)
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);

  const pieData = [
    { name: "Ingresos", value: income },
    { name: "Gastos", value: expense },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Reportes
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" color="primary" onClick={handleDownloadCsv}>
          Descargar CSV
        </Button>
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Distribución Ingresos vs Gastos</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Transacciones por Fecha</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transactions}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
