import User from "../models/User.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
    githubLoginOnly: false,
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
  // id/pw로 로그인한 클라이언트의 세션 초기화 => express-session mw에 의해 쿠키 전송
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const see = (req, res) => {
  return res.send("SEE USER");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: ["read:user", "user:email"].join(" "),
  });
  return res.redirect(`${baseUrl}?${params.toString()}`);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const params = new URLSearchParams({
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  });
  const resp = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  }).then((res) => res.json());
  if ("access_token" in resp) {
    const { access_token } = resp;
    const apiUrl = "https://api.github.com/user";
    const userData = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
    const emailData = await fetch(`${apiUrl}/emails`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
    const { email } = emailData.find((d) => d.primary && d.verified);
    if (!email) {
      return res.redirect("/login");
    }
    let user = await User.findOne({
      email,
      githubLoginOnly: true,
    });
    if (!user) {
      // github에 등록된 이메일을 가지는 계정이 없으므로 사이트 회원가입 과정이 필요하다
      user = await User.create({
        name: userData.name,
        email,
        userName: userData.login,
        password: "",
        location: userData.location,
        githubLoginOnly: true,
        avatarUrl: userData.avatar_url,
      });
    }
    // github 계정으로 로그인한 클라이언트의 세션 초기화 => express-session mw에 의해 쿠키 전송
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
