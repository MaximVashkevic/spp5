import {default as FetchHelper} from "../helpers/fetchWithMessagesHelper.js";

const StockService = {
    stock: async (symbol) => {
        const url = `stock/${symbol.toUpperCase()}`
        const response = await FetchHelper.fetchData(url, 'GET')
        if (response.status === 200) {
            window.location.hash = "#/" + url
        }
        return response
    },
    stockOperation: async (url, symbol, amount) => {
        const body = {symbol: symbol.toUpperCase(), amount}
        return await FetchHelper.fetchData(url, 'POST', body)
    },

    search: async (query) => {
        const url = `stock/search/${query}`
        return await FetchHelper.fetchData(url, 'GET')
    }
}

export default StockService