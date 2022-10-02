import Video from "../models/Video.js";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", {
      pageTitle: "Home",
      videos,
    });
  } catch {
    return res.render("server-error");
  }
};
export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", {
    pageTitle: `Watching`,
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", {
    pageTitle: `Editting`,
  });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", {
    pageTitle: "Upload",
  });
};
export const postUpload = (req, res) => {
  return res.redirect("/");
};
