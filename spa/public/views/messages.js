import MessageHelper from "../helpers/messageHelper.js";

const html = `
    <% if (messages) { %>
    <% for (const message of messages) { %>
    <div class="alert alert-<%=message.type%>">
        <p><%=message.text%></p>
    </div>
    <% } %>
    <% } %>`

const Messages = {
    render: async () => {
        const messages = await MessageHelper.getMessages()
        await MessageHelper.clearMessages()
        return await ejs.render(html, {messages})
    }
}

export default Messages