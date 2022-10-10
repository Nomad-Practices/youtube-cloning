import User from "../../models/User";

export default async (req, res) => {
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
    // userSchema의 preSave mw 수행으로 pw hashing 적용
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
