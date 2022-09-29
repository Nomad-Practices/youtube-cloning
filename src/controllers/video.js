const fakeUser = {
  username: "jason",
  loggedIn: false,
};

const videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
];

export const trending = (req, res) => {
  // .pug template을 렌더링하면서 변수를 전달할 수 있는 영역은 바로 controller이다!!
  return res.render("home", {
    pageTitle: "Home",
    fakeUser,
    videos,
  });
};
export const see = (req, res) => {
  return res.render("watch");
};
export const edit = (req, res) => {
  return res.render("edit");
};
export const search = (req, res) => {
  return res.send("SEARCH VIDEO");
};
export const upload = (req, res) => {
  return res.send("UPLOAD VIDEO");
};
export const remove = (req, res) => {
  return res.send("REMOVE VIDEO");
};
