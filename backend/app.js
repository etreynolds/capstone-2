"use strict";

/** Express app for SweaterWeather */

const express = require("express")
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const morgan = require("morgan");

const app = express()

/** Access-Control-Allow-Origin: * in headers */
app.use(cors());
app.use(express.json());
/** logging -> ex) GET /users/testuser1 401 1350 - 3.731 ms  */
app.use(morgan("tiny"));

//  This middleware runs on every incoming request and tries to verify the JWT 
// token from the request's authorization header. If the token is valid, it adds 
// the decoded user information to res.locals.user.
app.use(authenticateJWT);


app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

//Homepage message
app.get("/", (req, res) => {
    let result = "Welcome to SweaterWeather!"
    return res.send(result);
})


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});


module.exports = app;