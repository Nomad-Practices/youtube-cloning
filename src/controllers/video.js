export const trending = (req, res) => {
  // .pug template을 렌더링하면서 변수를 전달할 수 있는 영역은 바로 controller이다!!
  return res.render("home", {
    pageTitle: "Home",
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
