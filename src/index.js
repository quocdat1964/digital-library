import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRoutes from './routes';
import {Toaster} from 'react-hot-toast';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Toaster
                    position="top-right" // Vị trí hiển thị toast (có thể là top-center, bottom-left,...)
                    reverseOrder={false} // Thứ tự hiển thị toast mới (true: mới nhất ở dưới)
                    toastOptions={{
                        // Tùy chỉnh kiểu dáng cho tất cả các loại toast
                        duration: 3000, // Thời gian hiển thị mặc định (ms)
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            style: {
                                background: '#28a745', // Màu nền xanh cho success
                                color: '#fff',
                            },
                            iconTheme: {
                                primary: '#fff',
                                secondary: '#28a745',
                            },
                        },
                        error: {
                            style: {
                                background: '#dc3545', // Màu nền đỏ cho error
                                color: '#fff',
                            },
                            iconTheme: {
                                primary: '#fff',
                                secondary: '#dc3545',
                            },
                        },
                    }}
                />
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);