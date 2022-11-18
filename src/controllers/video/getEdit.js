import Video from "../../models/Video";

export default async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  if (video === null) {
    return res.status(404).render("404", {
      pageTitle: "video not found",
    });
  }
  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", {
    pageTitle: `Edit [${video.title}]`,
    video,
  });
};
