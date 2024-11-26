import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { AuthStatus } from '../interfaces';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
    // const authStatus: AuthStatus = AuthStatus.notAuthenticated;

    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === AuthStatus.checking) {
        return <h3>Cargando...</h3>;
    }

    return (
        <Routes>
            {status === AuthStatus.notAuthenticated ? (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<CalendarPage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};
