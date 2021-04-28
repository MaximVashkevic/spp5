import { default as FetchHelper } from "../helpers/fetchHelper.js";

const BaseService = {
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