import { useEffect, useState } from "react";
import { getTransactions, type Transaction } from "../../services/transactionService";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTransactions({ perPage: 1000 });
        setTransactions(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error("Error cargando transacciones:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Mis Transacciones
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/transactions/new")}
        sx={{ mb: 2 }}
      >
        Nueva Transacción
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <TableRow
                  key={t.id}
                  onClick={() => navigate(`/transactions/${t.id}/edit`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{t.type === "INCOME" ? "Ingreso" : "Gasto"}</TableCell>
                  <TableCell>${t.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay transacciones
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
