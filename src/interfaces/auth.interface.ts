export enum AuthStatus {
    notAuthenticated = 'not-authenticated',
    authenticating = 'authenticating',
    authenticated = 'authenticated',
    checking = 'checking',
}

export interface AuthData {
    user: User;
    token: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}