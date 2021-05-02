import { default as FetchHelper } from "../helpers/fetchWithMessagesHelper.js";

const AuthService = {
    login: async (login, password) => {
        const response = await FetchHelper.fetchData('login', 'POST', {login, password});
        if (response.status === 200) {
            window.location.hash = "#/"
        }
    },
    async register(login, password, passwordConfirm) {
        const response = await FetchHelper.fetchData('register', 'POST', {login, password, password_confirm: passwordConfirm})
        if (response.status === 200) {
            window.location.hash = "#/login"
        }
    },
    async logOut() {
        await FetchHelper.fetchData('logout', 'DELETE')
    }
}

export default AuthService