import { BASE_SERVER_URL } from "../config.js";

const FetchHelper = {
    fetchData: async (relativeUrl, method, data = {}) => {
        try {

            // Default options are marked with *
            const fullUrl = new URL(relativeUrl, BASE_SERVER_URL)
            const response = await fetch(fullUrl, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                // mode: "no-cors",
                body: (method === 'GET' || method === 'HEAD') ? null : JSON.stringify(data) // body data type must match "Content-Type" header
            });
            if (response.status === 401) {
                window.location.hash = "#/login"
            }
            return response
        }
        catch (err) {
            console.log(err)
        }
    }
} 

export default FetchHelper