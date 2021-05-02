const html = `<table class="table table-striped">
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Shares</th>
      <th>Price</th>
      <th>Transacted</th>
    </tr>
  </thead>
  <tboby>
    <% for (const transaction of accountInfo.transactions) { %>
    <tr>
      <td><a class="actionLink" href="#/stock/<%=transaction['symbol']%>"><%=transaction["symbol"]%></a></td>
      <td><%=transaction["shares"]%></td>
      <td><%=transaction["price"]%></td>
      <td><%=transaction["time"]%></td>
    </tr>
    <% } %>
  </tboby>
</table>`

const History = {
    render: async (transactions) => {
        return await ejs.render(html, {accountInfo: {transactions}})
    }
}

export default History