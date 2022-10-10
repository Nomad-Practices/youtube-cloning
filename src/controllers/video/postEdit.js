export default async (req, res) => {
  const { id } = req.params;
  const hasVideo = await Video.exists({
    _id: id,
  });
  if (!hasVideo) {
    return res.render("404", {
      pageTitle: "video not found",
    });
  }
  const { title, description, hashtags } = req.body;
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};
