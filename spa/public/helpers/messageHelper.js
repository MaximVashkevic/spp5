import Messages from "../views/messages.js";

const messagesKey = "MESSAGES"

/*
message:
{type: danger etc,
text: message text}
*/
let MessageHelper = {
    addMessages(messages) {
        if (!messages) return
        const existingMessages = JSON.parse(sessionStorage.getItem(messagesKey)) ?? []
        const allMessages = messages.concat(existingMessages)
        sessionStorage.setItem(messagesKey, JSON.stringify(allMessages))
    },
    clearMessages() {
        sessionStorage.removeItem(messagesKey)
    },
    getMessages() {
        return JSON.parse(sessionStorage.getItem(messagesKey)) ?? []
    },
    async renderMessages() {
        const messages = document.querySelector("#messages")
        messages.innerHTML = await Messages.render()
    }
}

export default MessageHelper