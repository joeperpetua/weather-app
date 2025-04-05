import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import './index.css'
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Layout from './routes/Layout';
import DashboardLayout from './routes/DashboardLayout';

const engine = new Styletron();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />} >
              <Route index path="/" element={<Home />} />
            </Route>
            
            <Route element={<DashboardLayout />} >
              <Route index path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  </StrictMode>,
)
