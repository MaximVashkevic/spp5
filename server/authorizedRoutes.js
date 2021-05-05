module.exports = (query) => !["/login", "/register", "/socket.io"].some((path) => query.includes(path))
