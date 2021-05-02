import MessageHelper from "./messageHelper.js";
import FetchHelper from "./fetchHelper.js";

const FetchWithMessagesHelper = {
    fetchData: async (...params) => {
        const result = await FetchHelper.fetchData(...params)
        const body = result.body
        if (body?.messages) {
            await MessageHelper.addMessages(body.messages)
        }

        return result
    }
}

export default FetchWithMessagesHelper