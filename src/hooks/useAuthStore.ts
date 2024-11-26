import calendarApi from '../api/calendarApi';
import { AuthData } from '../interfaces';
import { clearErrorMessage, onChecking, onLogin, onLogout, useAppSelector } from '../store';
import { useAppDispatch } from '../store/store';


export const useAuthStore = () => {


    const { status, user, errorMessage } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    const startLogin = async ({ loginEmail, loginPassword }: { loginEmail: string, loginPassword: string }) => {


        dispatch(onChecking());

        try {

            const { data } = await calendarApi.post<AuthData>('/auth/login', {
                email: loginEmail,
                password: loginPassword
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(onLogin(data.user));

        } catch (error) {
            console.log(error);
            dispatch(onLogout('Credential incorrect'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startLogout = async () => {
        localStorage.clear();
        dispatch(onLogout(''))
    }

    const startRegister = async ({ registerName, registerPassword, registerEmail }: { registerName: string, registerPassword: string, registerEmail: string }) => {

        try {

            const { data } = await calendarApi.post<AuthData>('/auth/create', {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString())

            dispatch(onLogin(data.user));

        } catch (error) {
            console.log(error)
            dispatch(onLogout('Error creating user'))
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(''))

        try {
            const { data } = await calendarApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString())

            dispatch(onLogin(data.user));


        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch(onLogout(''))
        }
    }


    return {
        //!* Propiedades
        status,
        user,
        errorMessage,

        //!* Metodos

        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}

