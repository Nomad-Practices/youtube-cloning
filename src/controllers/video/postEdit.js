import Video from "../../models/Video";

export default async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  if (video === null) {
    return res.render("404", {
      pageTitle: "video not found",
    });
  }
  if (String(video.owner._id) !== String(_id)) {
    req.flash("error", "You are not the owner of this video");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};
