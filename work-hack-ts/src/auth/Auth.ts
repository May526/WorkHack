import { app } from "../firebase_init";
import { History } from "history";

export const login = async (email: string, password: string, history: History) => {
    try {
        const user_cred = await app.auth().signInWithEmailAndPassword(email, password);
        history.push("/app");
        return user_cred.user;
    } catch (error) {
        alert(error)
    }
}

export const signup = async (email: string, password: string, history: History) => {
    try {
        const user_cred = await app.auth().createUserWithEmailAndPassword(email, password);
        history.push("/app");
        return user_cred.user
    } catch (error) {
        alert(error);
    }
};

export const logout = () => app.auth().signOut();
