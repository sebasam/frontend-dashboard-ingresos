import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTransaction,
  getTransactionById,
  updateTransaction,
  type Transaction,
} from "../../services/transactionService";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";

export default function TransactionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Transaction, "id">>({
    type: "INCOME",
    amount: 0,
    date: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getTransactionById(id)
        .then((data) =>
          setForm({
            type: data.type,
            amount: data.amount,
            date: data.date,
          })
        )
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      // Convierte a número si es el campo 'amount'
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Aseguramos que amount sea número al enviar
      const payload = {
        ...form,
        amount: Number(form.amount),
      };

      if (id) {
        await updateTransaction(id, payload);
      } else {
        await createTransaction(payload);
      }
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {id ? "Editar Transacción" : "Nueva Transacción"}
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <TextField
          select
          fullWidth
          label="Tipo"
          name="type"
          value={form.type}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="INCOME">Ingreso</MenuItem>
          <MenuItem value="EXPENSE">Gasto</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="number"
          label="Monto"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          type="date"
          label="Fecha"
          name="date"
          value={form.date.split("T")[0]}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/transactions")}
          >
            Cancelar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
