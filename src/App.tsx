import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate replace to="admin" />} />
                <Route path="login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="admin/*" element={<AdminLayout />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
