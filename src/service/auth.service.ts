import axios from "axios";
import { DisplayUser } from "../type/user";

const register = async (newUser: DisplayUser): Promise<DisplayUser | null> => { 
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/register`, newUser);

    return response.data;
}

const authService = {
    register,
    // login: async (user: DisplayUser): Promise<Jwt> => { }
}

export default authService; 