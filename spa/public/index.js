import {default as UrlHelper} from "./helpers/urlHelper.js";
import {default as Login} from "./views/login.js";
import {default as MainPage} from "./views/mainPage.js";
import Register from "./views/register.js";
import History from "./views/history.js";
import Search from "./views/search.js";
import Stock from "./views/stock.js";
import BaseService from "./services/baseService.js";
import Navbar from "./views/navbar.js";
import StockService from "./services/stockService.js";
import MessageHelper from "./helpers/messageHelper.js";
import {FORCE_REPAINT} from "./config.js";

const pages = {
    "/": MainPage,
    "/login": Login,
    "/register": Register,
    "/history": History,
    "/stock/search": Search,
    "/stock/:id": Stock
};

const router = async () => {
    const content = document.querySelector("#site-content");
    const header = document.querySelector("#nav");

    const routeParts = UrlHelper.getRouteParts();
    let url
    if (routeParts[0] === "stock") {
        if (routeParts[1] === "search") {
            url = "/stock/search"
        } else {
            url = "/stock/:id"
        }
    } else {
        url = "/" + routeParts[0]
    }
    let page = pages[url];

    switch (page) {
        case MainPage: {
            const response = await BaseService.info()
            if (response.status === 200) {
                const results = response.body
                content.innerHTML = await page.render(results.total, results.transactions)
            }
            break;
        }
        case History: {
            const response = await BaseService.history()
            if (response.status === 200) {
                const results = response.body
                content.innerHTML = await page.render(results)
            }
            break;
        }
        case Stock: {
            const response = await StockService.stock(routeParts[1])
            if (response.status === 200) {
                const results = response.body
                content.innerHTML = await page.render(results.symbolData, results.chartData, results.userShares)
                await page.afterRender(results.chartData)
            }
            break;
        }
        case Search: {
            const query = routeParts[2]
            const response = (await StockService.search(query))
            if (response.status === 200) {
                const results = response.body
                content.innerHTML = await page.render(results)
            }
            break;
        }

        default: {
            content.innerHTML = await page.render();
            await page.afterRender();
            break;
        }
    }

    await MessageHelper.renderMessages()

    const isAuthorized = !["register", "login"].some(e => e === UrlHelper.getRouteParts()[0])
    header.innerHTML = await Navbar.render({isAuthorized})
    await Navbar.afterRender({isAuthorized})

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    document.querySelectorAll('.actionLink').forEach(item => {
        item.addEventListener('click', () => {
            window.location.hash = item.hash
            window.dispatchEvent(new Event(FORCE_REPAINT))
        })
    })
};

window.addEventListener("DOMContentLoaded", async () => {
    window.location.hash = "#/"
    await router();
}, {once: true});

window.addEventListener(FORCE_REPAINT, router)