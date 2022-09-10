import { GetServerSidePropsContext } from "next";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Jwt } from "../type/Jwt";
import { DecodeJwt, DisplayUser, LoginUser } from "../type/user";

const register = async (newUser: DisplayUser): Promise<DisplayUser | null> => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, newUser)
    // console.log(data);
    return data;
}

const login = async (user: LoginUser): Promise<{jwt: Jwt, user: DisplayUser | null} > => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, user);

    if (data) {
        localStorage.setItem('jwt', JSON.stringify(data));

        const decodedJwt: DecodeJwt = jwtDecode(data.token);
        localStorage.setItem('user', JSON.stringify(decodedJwt.user));

        return { jwt: data, user: decodedJwt.user };
    }

    console.log(data);
    
    return data;
}

const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
}

const verifyJwt = async (jwt: string): Promise<boolean> => {
    const { data } = await axios.post(`http://localhost:8800/auth/verify-jwt`, { jwt });

    if (data) {
        const jwtExpirationMs = data.exp * 1000;

        return jwtExpirationMs > Date.now();

    }

    return false;
}

const authService = {
    register,
    login,
    logout,
    verifyJwt
}

export default authService; 