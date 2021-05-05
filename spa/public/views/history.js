const History = {
    render: async (transactions) => {
        console.log(transactions)
        return getHtml({transactions})
    }
}

function getHtml(accountInfo) {
    return `<table class="table table-striped">
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Shares</th>
      <th>Price</th>
      <th>Transacted</th>
    </tr>
  </thead>
  <tboby>
  ${accountInfo.transactions.reduce((prev, transaction) => {
        const date = new Date(transaction["time"])
        const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        return prev + `<tr>
      <td><a class="actionLink" href="#/stock/${transaction['symbol']}}">${transaction["symbol"]}</a></td>
      <td>${transaction["shares"]}</td>
      <td>${transaction["price"]}</td>
      <td>${dateString}</td>
    </tr>`
    }, "")}
  </tboby>
</table>`
}

export default History