const errorHandler = (error, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        status = 400
        message = error.errors[0].message
    }

    if (error.name == 'SequelizeDatabaseError' || error.name == 'SequelizeForeignKeyConstraintError') {
        status = 400
        message = 'Invalid input'
    }

    if (error.name === "Bad Request") {
        status = 400
        message = "Please input email or password"
    }

    if (error.name === "LoginError") {
        status = 401
        message = "Invalid email or password"
    }

    if (error.name === "Incorrect Password") {
        status = 401
        message = "Incorrect Password"
    }

    if (error.name === "Unauthorized" || error.name == 'JsonWebTokenError') {
        status = 401
        message = "Please login first"
    }

    if (error.name === "Forbidden") {
        status = 403
        message = "You dont have access"
    }

    if (error.name === "Not Found") {
        status = 404
        message = "error not found"
    }

    res.status(status).json({
        message
    }) 
}

module.exports = errorHandler