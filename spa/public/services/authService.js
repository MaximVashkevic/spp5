import { default as FetchHelper } from "../helpers/fetchHelper.js";
import MessageHelper from "../helpers/messageHelper.js";

const AuthService = {
    login: async (login, password) => {
        const response = await FetchHelper.fetchData('login', 'POST', {login, password});
        if (response.status === 200) {
            window.location.hash = "#/"
            return true
        }
        const json = await response.json()
        MessageHelper.addMessages(json.messages)
        return false
    },
    async register(login, password, passwordConfirm) {
        const response = await FetchHelper.fetchData('register', 'POST', {login, password, password_confirm: passwordConfirm})
        MessageHelper.addMessages((await response.json()).messages)
        if (response.status === 200) {
            window.location.hash = "#/login"
        }
        else {
            await MessageHelper.renderMessages()
        }
    },
    async logOut() {
        await FetchHelper.fetchData('logout', 'DELETE')

    }
}

export default AuthService