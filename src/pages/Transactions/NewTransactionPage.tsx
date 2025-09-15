import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { createTransaction } from "../../services/transactionService";
import { useNavigate } from "react-router-dom";

export default function NewTransactionPage() {
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction({
        type,
        amount: parseFloat(amount),
        date,
      });
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper sx={{ p: 3, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" mb={2}>
          Nueva Transacción
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Tipo"
            fullWidth
            value={type}
            onChange={(e : any) => setType(e.target.value as "INCOME" | "EXPENSE")}
            sx={{ mb: 2 }}
          >
            <MenuItem value="INCOME">Ingreso</MenuItem>
            <MenuItem value="EXPENSE">Gasto</MenuItem>
          </TextField>

          <TextField
            label="Monto"
            type="number"
            fullWidth
            value={amount}
            onChange={(e : any) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            label="Fecha"
            type="date"
            fullWidth
            value={date}
            onChange={(e : any) => setDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
