export interface DisplayUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface DecodeJwt {
    user: DisplayUser;
    exp: number;
    iat: number;
}

export interface LoginUser {
    email: string;
    password: string;
}