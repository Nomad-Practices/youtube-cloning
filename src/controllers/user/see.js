import User from "../../models/User";
import Video from "../../models/Video";

export default async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res.status(404).render("404", {
      pageTitle: "User not found.",
    });
  }
  return res.render("profile", {
    pageTitle: user.name,
    user,
  });
};
