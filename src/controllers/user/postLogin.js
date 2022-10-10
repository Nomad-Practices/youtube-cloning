import User from "../../models/User";
import bcrypt from "bcrypt";

export default async (req, res) => {
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
