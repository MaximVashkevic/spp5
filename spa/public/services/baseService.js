import {default as FetchHelper} from "../helpers/fetchWithMessagesHelper.js";
import {default as IoHelper} from "../helpers/socketHelper.js"

const BaseService = {
    info: async () => {
        const response = await IoHelper.fetchIo('info')
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