export default (req, res) => {
  req.session.destroy();
  req.flash("error", "Bye Bye");
  return res.redirect("/");
};
