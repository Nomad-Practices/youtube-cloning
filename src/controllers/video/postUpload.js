import Video from "../../models/Video";

export default async (req, res) => {
  const {
    body: { title, description, hashtags },
    file,
  } = req;
  try {
    await Video.create({
      title,
      ...(file && { videoUrl: file.path }),
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
};
