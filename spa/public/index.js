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

const pages = {
    "/": MainPage,
    "/login": Login,
    "/register": Register,
    "/history": History,
    "/stock/search": Search,
    "/stock/:id": Stock
};

const router = async () => {
    await MessageHelper.renderMessages()
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

    // if (isAuthorized || !UrlHelper.isRouteProtected) {
    //   alert("authorized");
    // } else {
    //   page = pages["/login"];
    //   window.location.hash = "#/login";
    // }

    switch (page) {
        case MainPage: {
            const results = await BaseService.info()
            if (results) {
                content.innerHTML = await page.render(results.total, results.transactions)
            }
            break;
        }
        case History: {
            const results = await BaseService.history()
            if (results) {
                content.innerHTML = await page.render(results)
            }
            break;
        }
        case Stock: {
            const results = await StockService.stock(routeParts[1])
            if (results) {
                content.innerHTML = await page.render(results.symbolData, results.chartData, results.userShares)
                await page.afterRender(results.chartData)
            }
            break;
        }
        case Search: {
            const symbol = routeParts[2]
            const results = await StockService.search(symbol)
            if (results) {
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

    const isAuthorized = !["register", "login"].some(e => e === UrlHelper.getRouteParts()[0])
    header.innerHTML = await Navbar.render({isAuthorized})
    await Navbar.afterRender({isAuthorized})

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

MessageHelper.clearMessages()
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
window.addEventListener("DOMContentLoaded", () => alert('loaded'))
window.location.hash="#/"