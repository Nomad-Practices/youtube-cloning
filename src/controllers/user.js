import User from "../models/User.js";

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
  await User.create({
    name,
    email,
    userName,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => {
  return res.send("EDIT USER");
};
export const remove = (req, res) => {
  return res.send("REMOVE USER");
};
export const login = (req, res) => {
  return res.send("LOGIN USER");
};
export const logout = (req, res) => {
  return res.send("LOGOUT USER");
};
export const see = (req, res) => {
  return res.send("SEE USER");
};
