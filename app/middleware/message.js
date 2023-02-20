function message(req, res, next) {
    console.log("This is me using the middleware");
    next();
}

module.exports = {message};