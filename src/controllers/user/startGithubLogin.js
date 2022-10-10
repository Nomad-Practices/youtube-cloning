export default (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: ["read:user", "user:email"].join(" "),
  });
  return res.redirect(`${baseUrl}?${params.toString()}`);
};
