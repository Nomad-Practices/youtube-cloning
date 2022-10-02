let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  // .pug template을 렌더링하면서 변수를 전달할 수 있는 영역은 바로 controller이다!!
  return res.render("home", {
    pageTitle: "Home",
    videos,
  });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos.find((v) => v.id === +id);
  return res.render("watch", {
    pageTitle: `Watching ${video.title}`,
    video,
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos.find((v) => v.id === +id);
  return res.render("edit", {
    pageTitle: `Editting ${video.title}`,
    video,
  });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos.find((v) => v.id === +id).title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", {
    pageTitle: "Upload",
  });
};
export const postUpload = (req, res) => {
  videos.push({
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "NOW",
    views: 0,
    id: videos.length + 1,
  });
  return res.redirect("/");
};
