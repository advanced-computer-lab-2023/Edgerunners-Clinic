var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const Admin = require("../Models/Admin.js");
const Doctor = require("../Models/Doctor.js");
const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");

const comparePassword = async (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

const createJWTP = (username) => {
  const token = jwt.sign(username, process.env.JWT_SECRETP);
  return token;
};
const createJWTD = (username) => {
  const token = jwt.sign(username, process.env.JWT_SECRETD);
  return token;
};

const createJWTA = (username) => {
  const token = jwt.sign(username, process.env.JWT_SECRETA);
  return token;
};

const protectP = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    console.log("not authorized");
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    console.log("not valid token");
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRETP);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};

const protectD = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    console.log("not authorized");
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    console.log("not valid token");
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRETD);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};

const protectA = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    console.log("not authorized");
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    console.log("not valid token");
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRETA);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};

const signin = async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;
  let user = await Patient.findOne({ Username: username });
  let isValid;
  if (user) {
    isValid = await comparePassword(password, user.Password);
    if (isValid) {
      res.status(200).send({
        token: createJWTP(username),
        type: "Patient",
        Username: username,
        wallet: user.Wallet,
      });
    } else {
      res.status(401).send("invalid password");
    }
  } else {
    user = await Doctor.findOne({ Username: username });
    if (user) {
      isValid = await comparePassword(password, user.Password);
      if (isValid) {
        if (user.Status !== "Pending") {
          res.status(200).send({
            token: createJWTD(username),
            type: "Doctor",
            Username: username,
            Status: user.Status,
            wallet: user.Wallet,
          });
        } else {
          res.status(401).send("Doctor not accepted yet");
        }
      } else {
        res.status(401).send("invalid password");
      }
    } else {
      user = await Admin.findOne({ Username: username });
      if (user) {
        isValid = await comparePassword(password, user.Password);
        if (isValid) {
          res.status(200).send({
            token: createJWTA(username),
            type: "Admin",
            Username: username,
          });
        } else {
          res.status(401).send("invalid password");
        }
      } else {
        res.status(401).send("user not found");
      }
    }
  }
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};
const changePassword = async (req, res) => {
  let username = req.body.Username;
  let password = req.body.Password;
  let confirm = req.body.confirmPassword;

  if (password == confirm) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    if (passwordRegex.test(password)) {
      let user = await Patient.findOne({ Username: username });
      if (user) {
        await Patient.updateOne(
          { Username: username },
          { $set: { Password: await hashPassword(password) } },
        );
        res.status(200).send("Patient password successfully updated");
      } else {
        user = await Doctor.findOne({ Username: username });
        if (user) {
          await Doctor.updateOne(
            { Username: username },
            { $set: { Password: await hashPassword(password) } },
          );
          res.status(200).send("Pharmacist password successfully updated");
        } else {
          user = await Admin.findOne({ Username: username });
          if (user) {
            await Admin.updateOne(
              { Username: username },
              { $set: { Password: await hashPassword(password) } },
            );
            res.status(200).send("Admin password successfully updated");
          } else {
            res.status(401).send("User not found");
          }
        }
      }
    } else {
      res
        .status(401)
        .send(
          "Password must have at least 3 characters, including 1 uppercase letter, 1 lowercase letter, and 1 digit.",
        );
    }
  } else {
    res.status(401).send("Passwords don't match");
  }
};
module.exports = {
  signin,
  comparePassword,
  createJWTA,
  createJWTD,
  createJWTP,
  protectA,
  protectD,
  protectP,
  changePassword,
};
