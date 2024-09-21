import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";

export const createUser = async (userName: string, email: string, achievements: any) => {
 try {
    const response = await axios.post(`${BACKEND_URL}/api/user`, { userName, email, achievements });
    console.log(" create user response", response)
    return response.data;
 } catch (error) {
    console.error("Error creating user:", error);
    throw error;
 }


}