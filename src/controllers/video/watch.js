import Video from "../../models/Video";

export default async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video === null) {
    return res.status(404).render("404", {
      pageTitle: "video not found",
    });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};
