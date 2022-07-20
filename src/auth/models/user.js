"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.API_SECRET || "tasneemo";
const users = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        //acl >>> access control list
        const acl = {
          user: ["read"],
          admin: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
  },{timestamps:false});

  model.beforeCreate = async function (password) {
    let hashedPass = await bcrypt.hash(password, 10);

    return hashedPass;
  };

  model.authenticateBasic = async function (username, password) {
    console.log(username, password);
    const user = await this.findOne({ where: { username: username } });
    console.log(user);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
    
    { 
  console.log("hi");
        return user; }
    throw new Error('Invalid User');
  };

  model.authenticateBearer = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };
  return model;
};

module.exports = users;
