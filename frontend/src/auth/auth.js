import axios from 'axios';
import { setAlert } from './alert';

export const login = async (email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`http://localhost:8000/api/token/`, body, config);

        setAlert('Authenticated successfully', 'success');

        return res.data; // You may want to return something meaningful from the login function
    } catch (err) {
        setAlert('Error Authenticating', 'error');
        throw err; // Propagate the error so it can be handled by the component
    }
};

export const signup = async ({ name, email, password, password2 }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, password2 });

    try {
        const res = await axios.post(`http://localhost:8000/api/accounts/signup`, body, config);

        setAlert('Registration successful', 'success');

        // Automatically log in the user after successful registration
        await login(email, password);

        return res.data; // You may want to return something meaningful from the signup function
    } catch (err) {
        setAlert('Error Authenticating', 'error');
        throw err; // Propagate the error so it can be handled by the component
    }
};

export const logout = () => {
    setAlert('Logout successful.', 'success');
    // You can perform any additional cleanup or redirection logic here
};
