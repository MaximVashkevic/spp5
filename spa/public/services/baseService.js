import {default as IoHelper} from "../helpers/socketHelper.js"
import {getCookie} from "../helpers/cookieHelper.js";


const BaseService = {
    info: async () => {
        const response = await IoHelper.fetchIo('info')
        if (response.status === 200) {
            window.location.hash = "#/"
        }
        return response
    },

    history: async () => {
        const variables = {
            id: getCookie('id')
        }
        const query = `
        query fetchHistory($id: Int!) {
          transactions(userId: $id) {
            symbol
            shares
            price
            time
          }
        }
      `
        const message = {
            query: query,
            variables: variables
        }
        const response = await IoHelper.fetchIo('history', message)
        if (response.status === 200) {
            window.location.hash = "#/history"
        }
        return response
    }
}

export default BaseService