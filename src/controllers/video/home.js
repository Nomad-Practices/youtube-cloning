import Video from "../../models/Video";

export default async (req, res) => {
  try {
    const videos = await Video.find({}).sort({
      createdAt: "desc",
    });
    res.render("home", {
      pageTitle: "Home",
      videos,
    });
  } catch {
    return res.status(500).render("server-error");
  }
};
