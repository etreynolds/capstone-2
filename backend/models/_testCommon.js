const bcrypt = require("bcrypt");

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");


// In SQL, string values should be enclosed in single quotes (')
async function commonBeforeAll() {

  // Delete existing data and reset sequences
  await db.query("DELETE FROM users");


  // Reset sequence values for SERIAL columns
  await db.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");


  await db.query(`
    INSERT INTO users(username,
                      password,
                      email)
    VALUES ('u1', $1, 'u1@email.com'),
           ('u2', $2, 'u2@email.com')
    RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]);
}


async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,

};