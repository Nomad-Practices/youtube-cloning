export default (req, res, next) => {
  res.locals.loggedIn = !!req.session.loggedIn;
  res.locals.siteName = "siteName";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
