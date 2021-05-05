import {FORCE_REPAINT} from "../config.js";
import {getCookie} from "./cookieHelper.js";

const io = globalThis.io
let socket = null


export default {
    async fetchIo(eventKey, message) {
        const id = getCookie('id')
        if (id) {
            if (!socket) {
                socket = io("localhost:3000", {auth: {token: id}})
            }
            const promise = new Promise((resolve, reject) => {
                socket.emit(eventKey, message, (result) => {
                    resolve(result)
                })
            })
            const result = {
                body: await promise,
                status: 200
            }
            return result
        } else {
            window.location.hash = "#/login"
            window.dispatchEvent(new Event(FORCE_REPAINT))
            return {status: 401}
        }
    }
}
