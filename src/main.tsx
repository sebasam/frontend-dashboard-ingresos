import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";
import "./index.css";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: { main: indigo[600] },
    secondary: { main: blue[500] },
    background: { default: "#f5f7fb" },
  },
  typography: {
    fontFamily: "Inter, Roboto, -apple-system, 'Segoe UI', Arial",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
