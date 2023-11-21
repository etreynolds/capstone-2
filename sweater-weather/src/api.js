import axios from "axios";

// const API_KEY = "d134bb024c84e36998b919106cd4c42c";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class WeatherApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${WeatherApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // API routes

    /** Get User. */

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Register a new User. */

    static async signupUser(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Login a user. */

    static async loginUser(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }

    /** Patch updated user. */

    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res.user
    }

    /** Delete a user. */

    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, {}, 'delete');
        return res.user
    }

    /** Get all users */

    static async findAllUsers() {
        let res = await this.request(`users/`, {}, 'get');
        return res.users
    }


}

export default WeatherApi;