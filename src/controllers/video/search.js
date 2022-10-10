import Video from "../../models/Video";

export default async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    // 검색필터 같은 경우 아래 mongoDB 문서 참조
    // https://www.mongodb.com/docs/manual/reference/operator/query/
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
        // $regex: new RegExp(`${keyword}$`, "i"),
        // $regex: new RegExp(`^${keyword}`, "i"),
      },
    });
  }
  return res.render("search", {
    pageTitle: "Search",
    videos,
  });
};
