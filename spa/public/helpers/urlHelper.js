const unprotectedRoutes = ["login", "register"]
const UrlHelper = {
    getRouteParts() {
        
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        return r.slice(1)
    },
    isRouteProtected() {
        let url = location.hash.slice(1).toLowerCase() || '/';
        return !unprotectedRoutes.some(unprotectedRoute => url.includes(unprotectedRoute))
    }
}

export default UrlHelper