import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { SnackbarProvider } from 'baseui/snackbar';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import './index.css'
import Home from './routes/Home';
import DashboardRoot from './routes/Dashboard/DashboardRoot';
import Layout from './routes/Layout';
import DashboardLayout from './routes/DashboardLayout';
import Login from './routes/Login';
import { AuthProvider } from './providers/Auth';
import DashboardEdit from './routes/Dashboard/DashboardEdit';
import DashboardAdd from './routes/Dashboard/DashboardAdd';
import NotFound from './routes/NotFound';

const engine = new Styletron();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <SnackbarProvider>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route element={<Layout />} >
                    <Route index path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path='*' element={<NotFound />} />
                  </Route>

                  <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardRoot />} />
                    <Route path="edit/:id" element={<DashboardEdit />} />
                    <Route path="add" element={<DashboardAdd />} />
                  </Route>

                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </SnackbarProvider>
        </BaseProvider>
      </StyletronProvider>
    </ReduxProvider>
  </StrictMode>,
)
