const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Hello Satan",
    email: "hello_satan@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "John Smith",
    email: "johnsmith@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
];

module.exports = users;
