import { default as FetchHelper } from "../helpers/fetchHelper.js";
import MessageHelper from "../helpers/messageHelper.js";

const StockService = {
    stock: async (symbol) => {
        const url = `stock/${symbol}`
        const response = await FetchHelper.fetchData(url, 'GET')
        if (response.status === 200) {
            window.location.hash = "#/" + url
            return await response.json()
        }
    },
    stockOperation: async (url, symbol, amount) => {
        const body = {symbol, amount}
        const response = await FetchHelper.fetchData(url, 'POST', body)
        window.location.hash = "#/"
        return await response.json()
    },

    // rename symbol to query
    search: async (symbol) => {
        const url = `stock/search?query=${symbol}`
        const response = await FetchHelper.fetchData(url, 'GET')
        return await response.json()
    }
}

export default StockService