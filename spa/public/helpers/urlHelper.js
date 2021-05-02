const unprotectedRoutes = ["login", "register"]
const UrlHelper = {
    getRouteParts() {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let parts = url.split("/")
        return parts.slice(1)
    }
}

export default UrlHelper