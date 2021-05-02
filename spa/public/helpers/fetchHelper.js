import {BASE_SERVER_URL, FORCE_REPAINT} from "../config.js";

const FetchHelper = {
    fetchData: async (relativeUrl, method, data = {}) => {
        try {
            const fullUrl = new URL(relativeUrl, BASE_SERVER_URL).toString()
            const response = await fetch(fullUrl, {
                method: method,
                credentials: 'include',
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                body: (method === 'GET' || method === 'HEAD') ? null : JSON.stringify(data)
            });
            // TODO: move to other place?
            if (response.status === 401) {
                window.location.hash = "#/login"
                window.dispatchEvent(new Event(FORCE_REPAINT))
            }
            try {
                const body = await response.json()
                return {status: response.status, body: body}
            }
            catch (err) {
                return {status: response.status, body: undefined}
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export default FetchHelper