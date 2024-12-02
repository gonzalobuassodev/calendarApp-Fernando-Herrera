import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthStatus } from '../../interfaces';
// import { AuthData } from '../../interfaces/auth.interface';

export interface AuthState {
    status: AuthStatus;
    user: User;
    errorMessage: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
}

const initialState: AuthState = {
    status: AuthStatus.notAuthenticated,
    user: {
        _id: '',
        name: '',
        email: '',
    },
    errorMessage: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = AuthStatus.checking;
            state.user = {
                _id: '',
                name: '',
                email: '',
            }
            state.errorMessage = '';
        },
        onLogin: (state, action: PayloadAction<User>)=> {
            state.status = AuthStatus.authenticated;
            state.user = action.payload;
            state.errorMessage = '';
        },
        onLogout: (state, action: PayloadAction<string>) => {
            state.status = AuthStatus.notAuthenticated;
            state.user = {
                _id: '',
                name: '',
                email: '',
            }
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = ''
        }

    },
})
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions
