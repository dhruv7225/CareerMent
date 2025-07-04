import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 
"@tanstack/react-query";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { StyledEngineProvider } from "@mui/material";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<StyledEngineProvider injectFirst>

		<LocalizationProvider dateAdapter={AdapterDayjs}>

		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
		</LocalizationProvider>
		</StyledEngineProvider>
	</StrictMode>
	
);
