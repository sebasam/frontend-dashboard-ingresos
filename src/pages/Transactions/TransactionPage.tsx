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
} from "@mui/material";

export default function TransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Transaction, "id">>({
    type: "INCOME",
    amount: 0,
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (id) {
      getTransactionById(id).then((data) =>
        setForm({
          type: data.type,
          amount: data.amount,
          date: data.date,
        })
      );
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateTransaction(id, form);
      } else {
        await createTransaction(form);
      }
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    }
  };

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

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </Paper>
    </Box>
  );
}
