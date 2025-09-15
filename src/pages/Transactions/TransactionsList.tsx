import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, type Transaction } from "../../services/transactionService";
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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTransactions = async () => {
    setLoading(true);
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

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta transacción?")) return;
    try {
      await deleteTransaction(id);
      loadTransactions(); // recarga la lista
    } catch (err) {
      console.error("Error eliminando la transacción:", err);
    }
  };

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
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.type === "INCOME" ? "Ingreso" : "Gasto"}</TableCell>
                  <TableCell>${t.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/transactions/${t.id}/edit`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(t.id)}
                      >
                        Eliminar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
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
