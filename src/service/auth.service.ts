import axios from "axios";
import { DisplayUser } from "../type/user";

const register = async (newUser: DisplayUser): Promise<DisplayUser | null> => {
    const { data } = await axios.post(`http://localhost:8080/auth/register`, newUser);

    console.log(data);
    

    return data;
}

const authService = {
    register,
    // login: async (user: DisplayUser): Promise<Jwt> => { }
}

export default authService; 