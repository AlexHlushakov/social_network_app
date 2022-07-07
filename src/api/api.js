import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': "13776224-f3a0-420d-882e-71bb05b796e9"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

/*const telegram = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})*/


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

export const ProfileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },

    getUserStatus(userId = '22430') {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },

    updateUserStatus(status) {
        return instance.put(`profile/status`, { status: status }).then(response => response.data);
    },

    updateProfile(profile) {
        return instance.put(`profile`, profile ).then(response => response.data);
    },
    updateUserPhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    }
}

export const FeedbackAPI ={
    sendFeedback(token,chat_id, data){
        return axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${data}`)
    }
}