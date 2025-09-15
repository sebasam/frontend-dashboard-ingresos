import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionService";
import type { Transaction } from "../../services/transactionService";
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

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <CircularProgress />;

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
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  {t.type === "INCOME" ? "Ingreso" : "Gasto"}
                </TableCell>
                <TableCell>${t.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(t.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
