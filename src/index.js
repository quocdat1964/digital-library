import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRoutes from './routes';
import AppInitializer from './AppInitializer';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppInitializer>
                    <AppRoutes />
                </AppInitializer>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);