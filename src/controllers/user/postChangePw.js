import bcrypt from "bcrypt";
import User from "../../models/User";

export default async (req, res) => {
  // send notification
  const {
    session: {
      user: { _id, password },
    },
    body: { prevPw, newPw, confirmation },
  } = req;
  const isPwMatch = await bcrypt.compare(prevPw, password);
  if (!isPwMatch) {
    return res.status(400).render("change-pw", {
      pageTitle: "Change Password",
      errorMsg: "current pw is not correct",
    });
  }
  if (newPw !== confirmation) {
    return res.status(400).render("change-pw", {
      pageTitle: "Change Password",
      errorMsg: "newPw and confirmation does not match",
    });
  }
  // pw 변경을 우선 user doc에 먼저 적용하고,
  const user = await User.findById({ _id });
  user.password = newPw;
  await user.save();
  // 대응되는 세션에도 동일하게 적용해야 한다.
  // 이유: 위에서 기존 pw를 세션정보에서 조회하기 때문이다.
  req.session.user.password = user.password;
  req.flash("info", "Password updated");
  return res.redirect("/logout");
};
