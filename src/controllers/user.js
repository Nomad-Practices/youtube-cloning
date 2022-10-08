import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", {
    pageTitle: "Join",
  });
};
export const postJoin = async (req, res) => {
  const { name, email, userName, password, pwCheck, location } = req.body;
  if (password !== pwCheck) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errMsg: "passwords confirmation doesn't match",
    });
  }
  const duplicateExists = await User.exists({
    $or: [{ userName }, { email }],
  });
  if (duplicateExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errMsg: "This userName/email is already taken!",
    });
  }
  try {
    await User.create({
      name,
      email,
      userName,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errMsg: error._message,
    });
  }
};
export const edit = (req, res) => {
  return res.send("EDIT USER");
};
export const remove = (req, res) => {
  return res.send("REMOVE USER");
};
export const getLogin = (req, res) => {
  return res.render("login", {
    pageTitle: "Login",
  });
};
export const postLogin = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({
    userName,
  });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errMsg: "Sorry, it seems like you're not registered",
    });
  }
  const isPwMatch = await bcrypt.compare(password, user.password);
  if (!isPwMatch) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errMsg: "Wrong password!",
    });
  }
  // 로그인한 클라이언트의 세션 초기화
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const logout = (req, res) => {
  return res.send("LOGOUT USER");
};
export const see = (req, res) => {
  return res.send("SEE USER");
};
