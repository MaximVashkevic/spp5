import StockService from "../services/stockService.js";

const html =`<div class="row">
  <div class="col-md-6">
    <div class="panel panel-default same" id="company-info">
      <h1 class="display-2"><%=symbolData.symbol%></h1>
      <p class="text-secondary"><%=symbolData.companyName%></p>
      <h1 class="display-1 <%=(symbolData.isUp?'text-success':'text-danger')%>">
        <%=symbolData.price%>
      </h1>

      <div class="panel-footer">
        <p class="text-secondary">Market capitalization: <%=symbolData.marketCapitalization%></p>
        <p class="text-secondary">52 weeks high: <%=symbolData.week52high%></p>
        <p class="text-secondary">52 weeks low: <%=symbolData.week52low%>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="panel panel-default same" id="chart-parent">
      <canvas id="chart"></canvas>
    </div>
  </div>
</div>
<div class="panel panel-default same">
  <div id="shares-forms">
    <h1 class="display-2">Your shares: <%= userShares %></h1>
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#buy">Buy</a></li>
      <li  <% if (userShares === 0) { %> class="disabled" <% } %> >
        <a <% if (userShares !== 0) { %> data-toggle="tab" <% } %>
         href="#sell">Sell</a></li>
    </ul>
    <div class="tab-content">
      <div id="buy" class="tab-pane fade in active">
        <form id="buyForm" action="/stock/buy" method="POST">
          <div class="input-group">
            <input
              type="number"
              min="0"
              id="amount"
              name="amount"
              class="form-control"
              placeholder="Amount"
            />
            <input type="hidden" id="symbol" name="symbol" value="<%= symbolData.symbol %>">
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">Buy</button>
            </div>
          </div>
        </form>
      </div>
      <div id="sell" class="tab-pane fade">
        <form id="sellForm" action="/stock/sell" method="POST">
          <div class="input-group">
            <input
              type="number"
              min="0"
              max="<%= userShares %>"
              name="amount"
              id="amount"
              class="form-control"
              placeholder="Amount"
            />
            <input type="hidden" id="symbol" name="symbol" value="<%= symbolData.symbol %>">
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">Sell</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
`

const Stock = {
    render: async (symbolData, chartData, userShares) => {
        return await ejs.render(html, {symbolData, chartData, userShares})
    },
    afterRender: async (chartData) => {
        await generateChart(chartData)
        const sellForm = document.querySelector('#sellForm')
        await setStockFormListener(sellForm, 'stock/sell')
        const buyForm = document.querySelector('#buyForm')
        await setStockFormListener(buyForm, 'stock/buy')
    }
}

async function setStockFormListener(form, requestUrl) {
    form.addEventListener('submit', async e => {
        e.preventDefault()
        const amount = form['amount'].value
        const symbol = form['symbol'].value
        await StockService.stockOperation(requestUrl, symbol, amount)
    })
}

async function generateChart(chartData) {
    var ctx = document.getElementById('chart').getContext('2d');
    ctx.canvas.width = 600;
    ctx.canvas.height = 400;
    var chart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: '',
                data: chartData.data
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }

    });
}

export default Stock