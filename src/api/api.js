import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': "13776224-f3a0-420d-882e-71bb05b796e9"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export const AuthAPI = {
    authMe() {
        return instance.get(`auth/me`).then(response => response.data);
    },

    authLogin(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe }).then(response => response.data)
    },

    authLogout() {
        return instance.delete(`auth/login`).then(response => response.data)
    }
}


export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    followUser(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data.resultCode);
    },

    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data.resultCode);
    }
}
