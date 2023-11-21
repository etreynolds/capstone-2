"use strict";


const express = require("express");
const jsonschema = require("jsonschema");

const User = require("../models/user");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** GET / => { users: [ {username, email }, ... ] }
 *
 * Returns list of all users.
 *
 **/

router.get("/", async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users });

    } catch (err) {
        return next(err)
    }
})


/** GET /[username] => { user }
 *
 * Returns { username }
 * 
 * Authorization required: same user-as-:username
**/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { password, email }
 *
 * Returns { username, email }
 *
 * Authorization required: same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username, req.body);
        return res.json({ user });

    } catch (err) {
        return next(err)
    }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        next(err)
    }
})

module.exports = router