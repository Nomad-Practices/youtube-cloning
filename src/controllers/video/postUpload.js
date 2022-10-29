import User from "../../models/User";
import Video from "../../models/Video";

export default async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
    files: { video, thumbnail },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      ...(video && { videoUrl: video[0].path }),
      ...(thumbnail && { thumbnailUrl: thumbnail[0].path }),
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
};
