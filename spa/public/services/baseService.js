import {default as FetchHelper} from "../helpers/fetchWithMessagesHelper.js";

const BaseService = {
    info: async () => {
        const response = await FetchHelper.fetchData('info', 'GET')
        if (response.status === 200) {
            window.location.hash = "#/"
        }
        return response
    },

    history: async () => {
        const response = await FetchHelper.fetchData('history', 'GET')
        if (response.status === 200) {
            window.location.hash = "#/history"
        }
        return response
    }
}

export default BaseService