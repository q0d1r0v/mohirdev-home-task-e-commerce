const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { users } = require("../models/User");

const getUserById = (user_id) => {
  return users.find((user) => ~~user.id === ~~user_id);
};

const registerService = async (req, res) => {
  const { form } = req.body;

  const hashed_password = await bcrypt.hash(form.password, 10);

  const new_user = {
    id: uuidv4(),
    username: form.username,
    password: hashed_password,
  };
  if (users.length) {
    let is_unique = true;
    users.forEach((user) => {
      if (user.username === form.username) {
        is_unique = false;
        res.status(400).send({
          message: "Tarmoqda ushbu nomli foydalanuvchi mavjud!",
        });
      }
    });
    if (is_unique) {
      users.push(new_user);
      res.status(201).send({
        message: "Yangi foydalanuvchi yaratildi!",
      });
    }
  } else {
    users.push(new_user);
    res.status(201).send({
      message: "Yangi foydalanuvchi yaratildi!",
    });
  }
};
const loginService = (req, res) => {
  const { form } = req.body;
  const is_has = {
    username: false,
    password: false,
  };

  if (users.length) {
    users.forEach((user) => {
      if (user.username === form.username) {
        is_has.username = true;
        bcrypt.compare(form.password, user.password, (err, result) => {
          if (err) throw err;
          is_has.password = result;
          if (is_has.username && is_has.password) {
            const access_token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
              expiresIn: "24h",
            });

            res.status(200).send({
              message: "Success",
              access_token,
            });
          } else {
            res.status(400).send({
              message: "Foydalanuvchi nomi yoki paroli xato kiritildi!",
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Bunday foydalanuvchi mavjud emas!",
    });
  }
};

const loadUserData = (req, res) => {
  users.forEach((user) => {
    if (user.id == req.user?.id) {
      res.status(200).send({
        user,
      });
    }
  });
};

module.exports = {
  getUserById,
  registerService,
  loginService,
  loadUserData,
};
