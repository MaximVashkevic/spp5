import { default as FetchHelper } from "../helpers/fetchHelper.js";
import MessageHelper from "../helpers/messageHelper.js";

const BaseService = {
    // login: async (login, password) => {
    //     const response = await FetchHelper.fetchData('login', 'POST', {login, password});
    //     if (response.status === 200) {
    //         alert("logged in")
    //         debugger
    //         window.location.hash = "#/"
    //         return true
    //     }
    //     const json = await response.json()
    //     MessageHelper.addMessages(json.messages)
    //     return false
    // }

    info: async () => {
        const response = await FetchHelper.fetchData('info', 'GET')
        if (response.status === 200) {
            window.location.hash = "#/"
            return await response.json()
        }
    },

    history: async () => {
        const response = await FetchHelper.fetchData('history', 'GET')
        if (response.status === 200) {
            window.location.hash = "#/history"
            return await response.json()
        }
    }
}

export default BaseService