export default (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authroized");
    return res.redirect("/");
  }
};
