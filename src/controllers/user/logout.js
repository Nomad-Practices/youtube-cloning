export default (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
