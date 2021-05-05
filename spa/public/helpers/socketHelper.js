import {FORCE_REPAINT} from "../config.js";

const io = globalThis.io
let socket = null

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


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
            return await promise
        } else {
            window.location.hash = "#/login"
            window.dispatchEvent(new Event(FORCE_REPAINT))
            return {status: 401}
        }
    }
}
